import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Monitor, 
  Send, 
  Server, 
  Database, 
  HardDrive, 
  RotateCcw, 
  RefreshCw,
  ArrowDown,
  ArrowUp
} from "lucide-react";
import { FlowStep } from "./TaskTraceApp";

interface FlowDiagramProps {
  currentStep: FlowStep;
}

const steps = [
  {
    id: 1,
    title: "User Interaction",
    description: "You type 'Buy milk' and click 'Add Task'",
    icon: Monitor,
    location: "Frontend",
    color: "text-primary"
  },
  {
    id: 2,
    title: "API Request",
    description: "Frontend sends POST request to /addTask",
    icon: Send,
    location: "Frontend → Backend",
    color: "text-warning"
  },
  {
    id: 3,
    title: "Request Processing",
    description: "Backend receives and validates the request",
    icon: Server,
    location: "Backend",
    color: "text-primary-light"
  },
  {
    id: 4,
    title: "Database Query",
    description: "Backend executes INSERT INTO tasks...",
    icon: Database,
    location: "Backend → Database",
    color: "text-success"
  },
  {
    id: 5,
    title: "Data Storage",
    description: "Database stores task and returns success",
    icon: HardDrive,
    location: "Database",
    color: "text-primary-glow"
  },
  {
    id: 6,
    title: "Response",
    description: "Backend sends success response with task data",
    icon: RotateCcw,
    location: "Backend → Frontend",
    color: "text-warning"
  },
  {
    id: 7,
    title: "UI Update",
    description: "Frontend adds task to the list (no refresh needed!)",
    icon: RefreshCw,
    location: "Frontend",
    color: "text-success"
  }
];

export const FlowDiagram = ({ currentStep }: FlowDiagramProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Data Flow Visualization</h2>
        <p className="text-muted-foreground">
          Follow the 7-step journey of your data
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep !== null && currentStep > step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="relative">
              <Card 
                className={`p-4 transition-all duration-500 ${
                  isActive 
                    ? 'ring-2 ring-primary shadow-glow animate-pulse-glow' 
                    : isCompleted 
                    ? 'bg-gradient-subtle border-success/50' 
                    : 'hover:shadow-card'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                    ${isActive 
                      ? 'bg-gradient-primary text-white animate-pulse' 
                      : isCompleted 
                      ? 'bg-success text-white' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className={`font-semibold ${isActive ? step.color : ''}`}>
                        Step {step.id}: {step.title}
                      </h3>
                      <Badge 
                        variant={isActive ? "default" : "secondary"} 
                        className="text-xs"
                      >
                        {step.location}
                      </Badge>
                    </div>
                    <p className={`text-sm ${
                      isActive ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.description}
                    </p>
                  </div>

                  {isCompleted && (
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full" />
                      </div>
                    </div>
                  )}
                </div>
              </Card>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  {index % 2 === 0 ? (
                    <ArrowDown className={`w-4 h-4 ${
                      currentStep !== null && currentStep > step.id 
                        ? 'text-success' 
                        : 'text-muted-foreground'
                    }`} />
                  ) : (
                    <ArrowUp className={`w-4 h-4 ${
                      currentStep !== null && currentStep > step.id 
                        ? 'text-success' 
                        : 'text-muted-foreground'
                    }`} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};