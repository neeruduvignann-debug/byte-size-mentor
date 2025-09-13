import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, CheckCircle, Clock, Star, Users, Trophy } from "lucide-react";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  timeEstimate: string;
  points: number;
  completed: boolean;
  completionRate: number;
  tags: string[];
  starterCode: string;
  testCases: number;
}

const mockExercises: Exercise[] = [
  {
    id: "1",
    title: "Array Manipulation Challenge",
    description: "Write a function that finds the second largest number in an array without sorting.",
    difficulty: "medium",
    timeEstimate: "15 min",
    points: 150,
    completed: false,
    completionRate: 78,
    tags: ["arrays", "algorithms", "javascript"],
    starterCode: "function findSecondLargest(arr) {\n  // Your code here\n}",
    testCases: 5
  },
  {
    id: "2", 
    title: "String Palindrome Checker",
    description: "Create a function that checks if a string is a palindrome, ignoring spaces and case.",
    difficulty: "easy",
    timeEstimate: "10 min",
    points: 100,
    completed: true,
    completionRate: 95,
    tags: ["strings", "validation", "javascript"],
    starterCode: "function isPalindrome(str) {\n  // Your code here\n}",
    testCases: 8
  },
  {
    id: "3",
    title: "Binary Tree Traversal",
    description: "Implement in-order, pre-order, and post-order traversal for a binary tree.",
    difficulty: "hard",
    timeEstimate: "30 min",
    points: 250,
    completed: false,
    completionRate: 45,
    tags: ["trees", "recursion", "data-structures"],
    starterCode: "class TreeNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nfunction inorderTraversal(root) {\n  // Your code here\n}",
    testCases: 12
  }
];

export const ExerciseCard = () => {
  const [selectedExercise, setSelectedExercise] = useState<string>("1");
  const [filter, setFilter] = useState<"all" | "easy" | "medium" | "hard">("all");

  const filteredExercises = mockExercises.filter(exercise => 
    filter === "all" || exercise.difficulty === filter
  );

  const currentExercise = filteredExercises.find(ex => ex.id === selectedExercise);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-success text-success-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "hard": return "bg-error text-error-foreground";
      default: return "bg-secondary text-secondary-foreground";
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    const iconCount = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3;
    return (
      <div className="flex gap-1">
        {Array.from({ length: 3 }, (_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 ${
              i < iconCount ? "fill-current" : "stroke-current fill-transparent"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="border-card-border">
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Practice Exercises</h3>
          </div>
          
          <div className="flex gap-2">
            {["all", "easy", "medium", "hard"].map((level) => (
              <Button
                key={level}
                variant={filter === level ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(level as any)}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        {/* Exercise Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">{mockExercises.filter(e => e.completed).length}</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-primary">{mockExercises.reduce((sum, e) => sum + (e.completed ? e.points : 0), 0)}</p>
            <p className="text-sm text-muted-foreground">Points Earned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">{Math.round(mockExercises.reduce((sum, e) => sum + e.completionRate, 0) / mockExercises.length)}%</p>
            <p className="text-sm text-muted-foreground">Avg Success Rate</p>
          </div>
        </div>
      </div>

      <div className="flex h-96">
        {/* Exercise List */}
        <ScrollArea className="w-1/2 border-r border-card-border custom-scrollbar">
          <div className="p-6 space-y-4">
            {filteredExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className={`p-4 cursor-pointer transition-smooth hover:shadow-elevated ${
                  selectedExercise === exercise.id ? "ring-2 ring-primary/50 glow-primary" : ""
                } ${exercise.completed ? "glow-success" : ""}`}
                onClick={() => setSelectedExercise(exercise.id)}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{exercise.title}</h4>
                        {exercise.completed && (
                          <CheckCircle className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {exercise.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        <div className="flex items-center gap-1">
                          {getDifficultyIcon(exercise.difficulty)}
                          <span className="capitalize">{exercise.difficulty}</span>
                        </div>
                      </Badge>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{exercise.timeEstimate}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-primary">
                        <Trophy className="w-3 h-3" />
                        <span className="text-xs font-medium">{exercise.points}pts</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Success Rate</span>
                      <span className="font-medium">{exercise.completionRate}%</span>
                    </div>
                    <Progress value={exercise.completionRate} className="h-1" />
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exercise.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>

        {/* Exercise Details */}
        <div className="flex-1 p-6">
          {currentExercise ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-lg font-semibold">{currentExercise.title}</h4>
                  {currentExercise.completed && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                </div>
                <p className="text-muted-foreground">{currentExercise.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Badge className={getDifficultyColor(currentExercise.difficulty)}>
                    <div className="flex items-center gap-1">
                      {getDifficultyIcon(currentExercise.difficulty)}
                      <span className="capitalize">{currentExercise.difficulty}</span>
                    </div>
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{currentExercise.timeEstimate}</span>
                </div>

                <div className="flex items-center gap-2 text-primary">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-medium">{currentExercise.points} points</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{currentExercise.testCases} test cases</span>
                </div>
              </div>

              <div>
                <h5 className="font-medium mb-2">Starter Code:</h5>
                <Card className="p-3 bg-editor-bg border-editor-border">
                  <pre className="text-sm font-mono text-foreground">
                    <code>{currentExercise.starterCode}</code>
                  </pre>
                </Card>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-primary glow-primary hover:shadow-glow transition-smooth"
                  disabled={currentExercise.completed}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentExercise.completed ? "Completed" : "Start Exercise"}
                </Button>
                
                <Button variant="outline">
                  View Solution
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground mt-16">
              Select an exercise to see details
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};