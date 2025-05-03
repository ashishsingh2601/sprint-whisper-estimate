
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Steps, Step } from "@/components/ui/steps";

const TeamsGuide = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Microsoft Teams Integration Guide</CardTitle>
        <CardDescription>
          Learn how to install and use PlanWise Bot in your Microsoft Teams workspace
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Installation Guide</AccordionTrigger>
            <AccordionContent>
              <Steps>
                <Step title="Register Your Bot">
                  <p>Register your bot in the Microsoft Azure Portal:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Go to <a href="https://portal.azure.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Azure Portal</a></li>
                    <li>Navigate to "Azure Bot Service"</li>
                    <li>Create a new bot registration</li>
                    <li>Note your Microsoft App ID and App Password</li>
                  </ol>
                </Step>
                
                <Step title="Deploy PlanWise Bot">
                  <p>Deploy this app to a hosting provider of your choice:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Use Azure App Service, Vercel, Netlify, or any other hosting platform</li>
                    <li>Set environment variables for your Microsoft App ID and Password</li>
                    <li>Note the HTTPS URL of your deployed application</li>
                  </ol>
                </Step>
                
                <Step title="Configure Bot Messaging Endpoint">
                  <p>In your Azure Bot registration:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Set the messaging endpoint to your deployed URL + "/api/messages"</li>
                    <li>Save your changes</li>
                  </ol>
                </Step>
                
                <Step title="Create App Package">
                  <p>Create a Teams app package using App Studio or Developer Portal:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>Open Microsoft Teams</li>
                    <li>Go to Apps &gt; Developer Portal</li>
                    <li>Create a new app</li>
                    <li>Configure your app details, including bot information</li>
                    <li>Generate an app package (ZIP file)</li>
                  </ol>
                </Step>
                
                <Step title="Install to Teams">
                  <p>Install your app to your Teams workspace:</p>
                  <ol className="list-decimal pl-6 space-y-2 mt-2">
                    <li>In Teams, go to Apps &gt; Manage your apps &gt; Upload a custom app</li>
                    <li>Upload your app package (ZIP file)</li>
                    <li>Add to a team or start a conversation with the bot</li>
                  </ol>
                </Step>
              </Steps>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How to Use PlanWise Bot</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Starting a Planning Session</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    In your Teams channel or in a direct message with the bot, type:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">Start planning</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Adding Team Members</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Each team member should type their name to join. Example:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">Ashish</p>
                  <p className="text-sm text-gray-600 mt-1">
                    When everyone has joined, type:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">Everyone joined</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Submitting Tickets</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Enter the ticket or user story you want to estimate:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">Build 101 feature</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Submitting Estimates</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Each team member should enter a number for their estimate:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">5</p>
                  <p className="text-sm text-gray-600 mt-1">
                    After 30 seconds, or when all members have estimated, results will be shown.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Moving to the Next Ticket</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    After reviewing the estimates, type:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">Next ticket</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Ending the Session</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    When done estimating all tickets, type:
                  </p>
                  <p className="bg-gray-100 p-2 rounded mt-1 font-mono">End session</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TeamsGuide;
