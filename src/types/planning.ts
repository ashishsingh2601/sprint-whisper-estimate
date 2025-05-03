
export enum SessionState {
  Idle = "idle",
  JoiningMembers = "joining_members",
  SubmittingTicket = "submitting_ticket",
  Estimating = "estimating",
  ShowingResults = "showing_results"
}

export interface TeamMember {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  sender: "bot" | "user";
  content: string;
  timestamp: Date;
}

export interface Estimate {
  memberId: string;
  value: number;
}

export interface TicketEstimation {
  id: string;
  ticket: string;
  estimates: Estimate[];
}

export interface PlanningSession {
  state: SessionState;
  members: TeamMember[];
  messages: Message[];
  currentTicket: string;
  estimates: TicketEstimation[];
  currentEstimates: Estimate[];
  timeRemaining: number;
}
