import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, CheckCircle, PlayCircle, BookOpen, Target } from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  progress: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  type: "tutorial" | "exercise" | "challenge";
}

const mockTutorials: Tutorial[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript programming",
    progress: 65,
    difficulty: "beginner",
    completed: false,
    lessons: [
      { id: "1", title: "Variables and Data Types", description: "Understanding variables, strings, numbers, and booleans", completed: true, type: "tutorial" },
      { id: "2", title: "Functions", description: "Creating and using functions", completed: true, type: "tutorial" },
      { id: "3", title: "Arrays and Objects", description: "Working with complex data structures", completed: false, type: "exercise" },
      { id: "4", title: "Control Flow", description: "If statements, loops, and conditionals", completed: false, type: "tutorial" },
    ]
  },
  {
    id: "2",
    title: "React Components",
    description: "Building interactive user interfaces",
    progress: 30,
    difficulty: "intermediate",
    completed: false,
    lessons: [
      { id: "5", title: "Component Basics", description: "Creating your first React component", completed: true, type: "tutorial" },
      { id: "6", title: "Props and State", description: "Managing component data", completed: false, type: "exercise" },
      { id: "7", title: "Event Handling", description: "Responding to user interactions", completed: false, type: "tutorial" },
    ]
  }
];

export const TutorialSidebar = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<string>("1");
  const [selectedLesson, setSelectedLesson] = useState<string>("3");

  const currentTutorial = mockTutorials.find(t => t.id === selectedTutorial);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-success text-success-foreground";
      case "intermediate": return "bg-warning text-warning-foreground";
      case "advanced": return "bg-error text-error-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle className="w-4 h-4 text-success" />;
    
    switch (type) {
      case "tutorial": return <BookOpen className="w-4 h-4 text-primary" />;
      case "exercise": return <PlayCircle className="w-4 h-4 text-warning" />;
      case "challenge": return <Target className="w-4 h-4 text-error" />;
      default: return <BookOpen className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <Card className="h-full border-card-border">
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Learning Path</h2>
        </div>
        
        {/* Tutorial Progress */}
        {currentTutorial && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm">{currentTutorial.title}</h3>
              <Badge className={getDifficultyColor(currentTutorial.difficulty)}>
                {currentTutorial.difficulty}
              </Badge>
            </div>
            <Progress value={currentTutorial.progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {currentTutorial.progress}% completed
            </p>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 custom-scrollbar">
        <div className="p-6 space-y-6">
          {/* Tutorial Selector */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Tutorials
            </h4>
            {mockTutorials.map((tutorial) => (
              <Button
                key={tutorial.id}
                variant={selectedTutorial === tutorial.id ? "default" : "ghost"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setSelectedTutorial(tutorial.id)}
              >
                <div className="text-left">
                  <div className="font-medium">{tutorial.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tutorial.description}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 ml-auto" />
              </Button>
            ))}
          </div>

          {/* Lessons */}
          {currentTutorial && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                Lessons
              </h4>
              {currentTutorial.lessons.map((lesson, index) => (
                <Button
                  key={lesson.id}
                  variant={selectedLesson === lesson.id ? "default" : "ghost"}
                  className={`w-full justify-start h-auto p-3 ${
                    lesson.completed ? "glow-success" : ""
                  }`}
                  onClick={() => setSelectedLesson(lesson.id)}
                >
                  <div className="flex items-start gap-3 text-left">
                    {getLessonIcon(lesson.type, lesson.completed)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                          {index + 1}
                        </span>
                        <span className="font-medium">{lesson.title}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {lesson.description}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}

          {/* Quick Actions */}
          <div className="pt-4 border-t border-card-border">
            <div className="space-y-2">
              <Button 
                className="w-full bg-gradient-primary glow-primary hover:shadow-glow transition-smooth"
              >
                Continue Learning
              </Button>
              <Button variant="outline" className="w-full">
                Practice Exercises
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};