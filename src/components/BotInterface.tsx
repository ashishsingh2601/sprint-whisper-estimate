
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import MessageList from "./MessageList";
import EstimationResults from "./EstimationResults";
import { PlanningSession, SessionState, Message, TeamMember, Estimate, TicketEstimation } from "@/types/planning";

const BotInterface = () => {
  const [input, setInput] = useState("");
  const [session, setSession] = useState<PlanningSession>({
    state: SessionState.Idle,
    members: [],
    messages: [],
    currentTicket: "",
    estimates: [],
    currentEstimates: [],
    timeRemaining: 0,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [session.messages]);
  
  useEffect(() => {
    if (session.timeRemaining > 0) {
      timerRef.current = setTimeout(() => {
        setSession(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 1000);
    } else if (session.state === SessionState.Estimating && session.timeRemaining === 0) {
      completeEstimation();
    }
    
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [session.timeRemaining, session.state]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  // Generate a truly unique ID for messages to avoid React key warnings
  const generateUniqueId = () => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };
  
  const addMessage = (message: Message) => {
    const messageWithUniqueId = {
      ...message,
      id: generateUniqueId()
    };
    
    setSession(prev => ({
      ...prev,
      messages: [...prev.messages, messageWithUniqueId]
    }));
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date()
    };
    
    addMessage(userMessage);
    processUserInput(input);
    setInput("");
  };
  
  const processUserInput = (text: string) => {
    const normalizedInput = text.trim().toLowerCase();
    
    switch (session.state) {
      case SessionState.Idle:
        if (normalizedInput === "start planning") {
          startPlanning();
        } else {
          addBotMessage("To start a planning session, type 'Start planning'");
        }
        break;
        
      case SessionState.JoiningMembers:
        if (normalizedInput === "everyone joined") {
          askForTicket();
        } else {
          addTeamMember(text.trim());
        }
        break;
        
      case SessionState.SubmittingTicket:
        submitTicket(text);
        break;
        
      case SessionState.Estimating:
        submitEstimate(normalizedInput);
        break;
        
      case SessionState.ShowingResults:
        if (normalizedInput === "next ticket") {
          askForTicket();
        } else if (normalizedInput === "end session") {
          endSession();
        } else {
          addBotMessage("Type 'Next ticket' to continue or 'End session' to finish planning");
        }
        break;
    }
  };
  
  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: generateUniqueId(),
      sender: "bot",
      content,
      timestamp: new Date()
    };
    
    addMessage(botMessage);
  };
  
  const startPlanning = () => {
    setSession(prev => ({
      ...prev,
      state: SessionState.JoiningMembers,
      members: [],
      estimates: []
    }));
    
    addBotMessage("Planning session started! Team members who want to join, please enter your name one by one.");
  };
  
  const addTeamMember = (name: string) => {
    if (session.members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
      addBotMessage(`${name} is already in the session.`);
      return;
    }
    
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: name
    };
    
    setSession(prev => ({
      ...prev,
      members: [...prev.members, newMember]
    }));
    
    addBotMessage(`${name} joined the planning session. Type 'Everyone joined' when all members are in.`);
  };
  
  const askForTicket = () => {
    setSession(prev => ({
      ...prev,
      state: SessionState.SubmittingTicket,
      currentTicket: "",
      currentEstimates: []
    }));
    
    addBotMessage("Please enter the ticket or user story to estimate:");
  };
  
  const submitTicket = (ticketDescription: string) => {
    setSession(prev => ({
      ...prev,
      state: SessionState.Estimating,
      currentTicket: ticketDescription,
      currentEstimates: [],
      timeRemaining: 30
    }));
    
    addBotMessage(`Now estimating: "${ticketDescription}"`);
    addBotMessage("Team members, please submit your estimates (a number) within 30 seconds.");
  };
  
  const submitEstimate = (estimateText: string) => {
    const estimateValue = parseInt(estimateText);
    
    if (isNaN(estimateValue)) {
      addBotMessage("Please enter a valid number for your estimate.");
      return;
    }
    
    // Find who is currently estimating based on not having submitted yet
    const availableMembers = session.members.filter(
      member => !session.currentEstimates.some(est => est.memberId === member.id)
    );
    
    if (availableMembers.length === 0) {
      addBotMessage("All team members have already submitted their estimates.");
      return;
    }
    
    // Assume the first available member is estimating
    const estimatingMember = availableMembers[0];
    
    const newEstimate: Estimate = {
      memberId: estimatingMember.id,
      value: estimateValue
    };
    
    const updatedEstimates = [...session.currentEstimates, newEstimate];
    
    setSession(prev => ({
      ...prev,
      currentEstimates: updatedEstimates
    }));
    
    addBotMessage(`Estimate received from ${estimatingMember.name}.`);
    
    // If all members have estimated, complete the estimation
    if (session.members.length === updatedEstimates.length) {
      completeEstimation();
    }
  };
  
  const completeEstimation = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Make sure we include all estimates, even with only one member
    const newTicketEstimation: TicketEstimation = {
      id: generateUniqueId(),
      ticket: session.currentTicket,
      estimates: [...session.currentEstimates]
    };
    
    setSession(prev => ({
      ...prev,
      state: SessionState.ShowingResults,
      estimates: [...prev.estimates, newTicketEstimation],
      timeRemaining: 0
    }));
    
    // Display results
    addBotMessage("Time's up! Here are the estimation results:");
  };
  
  const endSession = () => {
    addBotMessage("Planning session ended. Thank you for using PlanWise Bot!");
    
    setSession({
      state: SessionState.Idle,
      members: [],
      messages: [],
      currentTicket: "",
      estimates: [],
      currentEstimates: [],
      timeRemaining: 0,
    });
    
    toast.success("Planning session completed successfully!");
  };

  return (
    <div className="flex flex-col h-[70vh]">
      <div className="flex-grow overflow-y-auto p-4">
        <MessageList messages={session.messages} />
        
        {session.state === SessionState.ShowingResults && session.estimates.length > 0 && (
          <>
            <div className="my-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <EstimationResults 
                ticket={session.estimates[session.estimates.length - 1].ticket}
                estimates={session.estimates[session.estimates.length - 1].estimates}
                members={session.members}
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-2 mb-4">
              Type 'Next ticket' to continue or 'End session' to finish planning
            </div>
          </>
        )}
        
        {session.state === SessionState.Estimating && (
          <div className="my-4 bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="text-center">
              <div className="text-lg font-medium">Time remaining:</div>
              <div className="text-3xl font-bold text-yellow-600">{session.timeRemaining}s</div>
              <div className="mt-2 text-sm">
                {session.members.length - session.currentEstimates.length} member(s) still need to estimate
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <Separator />
      
      <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
        <Input
          type="text"
          placeholder={getInputPlaceholder(session.state)}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

function getInputPlaceholder(state: SessionState): string {
  switch (state) {
    case SessionState.Idle:
      return "Type 'Start planning' to begin";
    case SessionState.JoiningMembers:
      return "Enter your name to join or 'Everyone joined'";
    case SessionState.SubmittingTicket:
      return "Enter a ticket to estimate";
    case SessionState.Estimating:
      return "Enter your estimate (a number)";
    case SessionState.ShowingResults:
      return "Type 'Next ticket' or 'End session'";
    default:
      return "Type a message";
  }
}

export default BotInterface;
