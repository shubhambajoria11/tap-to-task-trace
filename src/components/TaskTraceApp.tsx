import { useState } from "react";
import { Card } from "@/components/ui/card";
import { TodoApp } from "./TodoApp";
import { FlowDiagram } from "./FlowDiagram";
import { StepIndicator } from "./StepIndicator";

export type FlowStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | null;

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export const TaskTraceApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentStep, setCurrentStep] = useState<FlowStep>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const addTask = async (text: string) => {
    if (!text.trim()) return;

    setIsAnimating(true);
    
    // Step 1: User interaction
    setCurrentStep(1);
    await delay(800);
    
    // Step 2: Frontend sends request
    setCurrentStep(2);
    await delay(800);
    
    // Step 3: Backend receives request
    setCurrentStep(3);
    await delay(800);
    
    // Step 4: Backend talks to database
    setCurrentStep(4);
    await delay(800);
    
    // Step 5: Database stores data
    setCurrentStep(5);
    await delay(800);
    
    // Step 6: Backend responds
    setCurrentStep(6);
    await delay(800);
    
    // Step 7: Frontend updates display
    setCurrentStep(7);
    
    const newTask: Task = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    
    setTasks(prev => [...prev, newTask]);
    
    await delay(1000);
    setCurrentStep(null);
    setIsAnimating(false);
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
            Task Trace: Frontend ↔ Backend Flow
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch how data flows through a modern web application when you add a simple to-do item.
            Each step is visualized in real-time to show the complete journey.
          </p>
        </div>

        {/* Current Step Indicator */}
        <StepIndicator currentStep={currentStep} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Todo App */}
          <Card className="p-6 shadow-card">
            <TodoApp 
              tasks={tasks} 
              onAddTask={addTask} 
              isAnimating={isAnimating}
            />
          </Card>

          {/* Flow Diagram */}
          <Card className="p-6 shadow-card">
            <FlowDiagram currentStep={currentStep} />
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            This educational demo shows the 7-step process that happens behind the scenes
            when you interact with any modern web application.
          </p>
        </div>
      </div>
    </div>
  );
};