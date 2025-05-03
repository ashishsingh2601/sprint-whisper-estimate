
import React from "react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  children: React.ReactNode;
  isActive?: boolean;
  isComplete?: boolean;
}

export const Step = ({ title, children, isActive, isComplete }: StepProps) => {
  return (
    <div className={cn("mb-6 last:mb-0", isActive ? "opacity-100" : "opacity-80")}>
      <div className="flex items-center mb-2">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-medium",
            isComplete
              ? "bg-green-100 text-green-700 border border-green-200"
              : isActive
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
          )}
        >
          {isComplete ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : null}
        </div>
        <h4 className="font-medium text-base">{title}</h4>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  );
};

export const Steps = ({ children }: { children: React.ReactNode }) => {
  // Clone children to add progression props
  const childrenArray = React.Children.toArray(children);
  const stepsWithProps = React.Children.map(childrenArray, (child, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<any>, {
        isActive: index === 0,
        isComplete: index < 0,
      });
    }
    return child;
  });

  return <div className="mt-4">{stepsWithProps}</div>;
};
