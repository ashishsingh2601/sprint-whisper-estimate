
import React from "react";
import { Estimate, TeamMember } from "@/types/planning";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface EstimationResultsProps {
  ticket: string;
  estimates: Estimate[];
  members: TeamMember[];
}

interface AggregatedEstimate {
  value: number;
  count: number;
}

const EstimationResults: React.FC<EstimationResultsProps> = ({ ticket, estimates, members }) => {
  // Calculate aggregated estimates
  const aggregatedEstimates = estimates.reduce<AggregatedEstimate[]>((acc, curr) => {
    const existingEstimate = acc.find(e => e.value === curr.value);
    
    if (existingEstimate) {
      existingEstimate.count += 1;
    } else {
      acc.push({ value: curr.value, count: 1 });
    }
    
    return acc;
  }, []);
  
  // Sort by estimate value in descending order
  aggregatedEstimates.sort((a, b) => b.value - a.value);
  
  // Sort individual estimates by value
  const sortedEstimates = [...estimates].sort((a, b) => b.value - a.value);
  
  const findMemberName = (memberId: string) => {
    const member = members.find(m => m.id === memberId);
    return member ? member.name : "Unknown";
  };
  
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Estimation results for:</h3>
        <p className="text-lg font-semibold text-blue-800 mb-3">{ticket}</p>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-500">Aggregated Estimates:</h4>
          <div className="flex flex-wrap gap-2">
            {aggregatedEstimates.map((estimate, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-base py-1 px-3 bg-blue-50 border-blue-200"
              >
                <span className="font-bold text-blue-700 mr-1">{estimate.value}</span>
                <span className="text-gray-600">({estimate.count} member{estimate.count !== 1 ? 's' : ''})</span>
              </Badge>
            ))}
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h4 className="text-sm font-medium text-gray-500 mb-2">Individual Estimates:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sortedEstimates.map((estimate) => (
            <div 
              key={estimate.memberId} 
              className="flex items-center justify-between p-2 rounded bg-gray-50 border border-gray-200"
            >
              <span className="text-gray-700">{findMemberName(estimate.memberId)}</span>
              <Badge variant="secondary">{estimate.value}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EstimationResults;
