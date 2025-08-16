import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FlowStep } from "./TaskTraceApp";

interface StepIndicatorProps {
  currentStep: FlowStep;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  if (currentStep === null) return null;

  const progress = (currentStep / 7) * 100;
  
  const stepMessages = {
    1: "🖱️ Capturing your input...",
    2: "📡 Sending request to server...",
    3: "⚙️ Server processing request...",
    4: "💾 Querying database...",
    5: "✅ Data saved successfully!",
    6: "📤 Sending response back...",
    7: "🎉 Updating your interface!"
  };

  return (
    <Card className="p-6 bg-gradient-accent border-primary/20 shadow-glow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary text-primary-foreground animate-pulse">
            Step {currentStep} of 7
          </Badge>
          <span className="font-medium text-foreground">
            {stepMessages[currentStep]}
          </span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {Math.round(progress)}%
        </span>
      </div>
      
      <Progress 
        value={progress} 
        className="h-2 animate-pulse"
      />
      
      <p className="text-xs text-muted-foreground mt-2">
        Data is flowing through your application stack...
      </p>
    </Card>
  );
};