
import { useState } from "react";
import BotInterface from "@/components/BotInterface";
import { Toaster } from "sonner";

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🤖</span> PlanWise Bot
          </h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-700">Sprint Planning Session</h2>
            <p className="text-sm text-gray-500">Estimate tickets collaboratively with your team</p>
          </div>
          
          <BotInterface />
        </div>
      </main>
      
      <footer className="bg-gray-100 border-t border-gray-200 p-4">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>PlanWise Bot &copy; 2025 - Made for Microsoft Teams</p>
        </div>
      </footer>
      
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
