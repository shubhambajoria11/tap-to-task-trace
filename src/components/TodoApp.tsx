import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Clock, CheckCircle2 } from "lucide-react";
import { Task } from "./TaskTraceApp";

interface TodoAppProps {
  tasks: Task[];
  onAddTask: (text: string) => Promise<void>;
  isAnimating: boolean;
}

export const TodoApp = ({ tasks, onAddTask, isAnimating }: TodoAppProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isAnimating) return;
    
    await onAddTask(inputValue);
    setInputValue("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Interactive To-Do App</h2>
        <p className="text-muted-foreground">
          Add a task below to see the complete data flow in action
        </p>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter a new task (e.g., 'Buy milk')"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnimating}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isAnimating}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isAnimating ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Add Task
          </Button>
        </div>
        
        {isAnimating && (
          <div className="text-center">
            <Badge variant="secondary" className="animate-pulse">
              <Clock className="w-3 h-3 mr-1" />
              Processing request...
            </Badge>
          </div>
        )}
      </form>

      {/* Task List */}
      <div className="space-y-3">
        <h3 className="font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-success" />
          Your Tasks ({tasks.length})
        </h3>
        
        {tasks.length === 0 ? (
          <Card className="p-6 text-center border-dashed">
            <p className="text-muted-foreground">No tasks yet. Add one above to get started!</p>
          </Card>
        ) : (
          <div className="space-y-2">
            {tasks.map((task, index) => (
              <Card 
                key={task.id} 
                className="p-4 animate-fade-in-up bg-gradient-subtle border-l-4 border-l-primary"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{task.text}</span>
                  <Badge variant="secondary" className="text-xs">
                    {task.createdAt.toLocaleTimeString()}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};