
import React from "react";
import { Message } from "@/types/planning";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { format } from "date-fns";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
    </div>
  );
};

const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const isBot = message.sender === "bot";
  
  return (
    <div
      className={cn(
        "flex gap-3",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <Avatar className="h-8 w-8 bg-blue-600 text-white">
          <span className="text-xs">🤖</span>
        </Avatar>
      )}
      
      <div
        className={cn(
          "px-4 py-2 rounded-lg max-w-[80%] relative",
          isBot
            ? "bg-white border border-gray-200 text-gray-800"
            : "bg-blue-600 text-white"
        )}
      >
        <div className="text-sm">
          {message.content}
        </div>
        <div 
          className={cn(
            "text-xs mt-1 opacity-70",
            isBot ? "text-gray-500" : "text-blue-100"
          )}
        >
          {format(new Date(message.timestamp), "HH:mm")}
        </div>
      </div>
      
      {!isBot && (
        <Avatar className="h-8 w-8 bg-blue-700 text-white">
          <span className="text-xs">👤</span>
        </Avatar>
      )}
    </div>
  );
};

export default MessageList;
