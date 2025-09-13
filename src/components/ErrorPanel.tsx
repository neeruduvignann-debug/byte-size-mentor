import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, Bug, Lightbulb, CheckCircle, X, ExternalLink } from "lucide-react";

interface CodeIssue {
  id: string;
  type: "error" | "warning" | "suggestion";
  line: number;
  column: number;
  message: string;
  description: string;
  suggestion?: string;
  fixable: boolean;
}

const mockIssues: CodeIssue[] = [
  {
    id: "1",
    type: "error",
    line: 5,
    column: 12,
    message: "Unexpected token ')'",
    description: "There's a syntax error in your code. You have an extra closing parenthesis.",
    suggestion: "Remove the extra ')' or add a matching opening parenthesis",
    fixable: true
  },
  {
    id: "2",
    type: "warning",
    line: 3,
    column: 8,
    message: "Unused variable 'userName'",
    description: "The variable 'userName' is declared but never used in your code.",
    suggestion: "Consider removing this variable or using it in your logic",
    fixable: true
  },
  {
    id: "3",
    type: "suggestion",
    line: 8,
    column: 1,
    message: "Consider using const instead of let",
    description: "This variable is never reassigned, so it can be declared as const for better code quality.",
    suggestion: "Change 'let' to 'const' for variables that don't change",
    fixable: true
  }
];

export const ErrorPanel = () => {
  const [selectedIssue, setSelectedIssue] = useState<string>("1");
  const [dismissedIssues, setDismissedIssues] = useState<string[]>([]);

  const activeIssues = mockIssues.filter(issue => !dismissedIssues.includes(issue.id));
  const errors = activeIssues.filter(issue => issue.type === "error");
  const warnings = activeIssues.filter(issue => issue.type === "warning");
  const suggestions = activeIssues.filter(issue => issue.type === "suggestion");

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error": return <AlertTriangle className="w-4 h-4 text-error" />;
      case "warning": return <Bug className="w-4 h-4 text-warning" />;
      case "suggestion": return <Lightbulb className="w-4 h-4 text-primary" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case "error": return "border-l-error bg-error/10";
      case "warning": return "border-l-warning bg-warning/10";
      case "suggestion": return "border-l-primary bg-primary/10";
      default: return "border-l-muted";
    }
  };

  const dismissIssue = (issueId: string) => {
    setDismissedIssues(prev => [...prev, issueId]);
  };

  const currentIssue = activeIssues.find(issue => issue.id === selectedIssue);

  return (
    <Card className="border-card-border">
      <div className="p-4 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bug className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Code Analysis</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-error/20 text-error-foreground">
              {errors.length} errors
            </Badge>
            <Badge variant="secondary" className="bg-warning/20 text-warning-foreground">
              {warnings.length} warnings
            </Badge>
          </div>
        </div>
      </div>

      <Tabs defaultValue="issues" className="h-80">
        <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
          <TabsTrigger value="issues">Issues ({activeIssues.length})</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          <TabsTrigger value="help">Help</TabsTrigger>
        </TabsList>

        <TabsContent value="issues" className="mt-0">
          <div className="flex h-72">
            {/* Issues List */}
            <ScrollArea className="w-1/2 border-r border-card-border custom-scrollbar">
              <div className="p-4 space-y-2">
                {activeIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`p-3 rounded-lg border-l-4 cursor-pointer transition-smooth ${
                      getIssueColor(issue.type)
                    } ${selectedIssue === issue.id ? "ring-2 ring-primary/50" : ""}`}
                    onClick={() => setSelectedIssue(issue.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getIssueIcon(issue.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{issue.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Line {issue.line}, Column {issue.column}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          dismissIssue(issue.id);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Issue Details */}
            <div className="flex-1 p-4">
              {currentIssue ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {getIssueIcon(currentIssue.type)}
                    <h4 className="font-medium">{currentIssue.message}</h4>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Location:</strong> Line {currentIssue.line}, Column {currentIssue.column}
                  </div>

                  <div className="text-sm">
                    <strong>Description:</strong>
                    <p className="mt-1 text-muted-foreground">{currentIssue.description}</p>
                  </div>

                  {currentIssue.suggestion && (
                    <div className="text-sm">
                      <strong>Suggestion:</strong>
                      <p className="mt-1 text-muted-foreground">{currentIssue.suggestion}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    {currentIssue.fixable && (
                      <Button size="sm" className="bg-gradient-success glow-success hover:shadow-success transition-smooth">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Quick Fix
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Learn More
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground mt-8">
                  Select an issue to see details
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="p-4">
          <div className="space-y-3">
            {suggestions.map((suggestion) => (
              <div key={suggestion.id} className="p-3 rounded-lg bg-primary/10 border-l-4 border-l-primary">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">{suggestion.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="help" className="p-4">
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Understanding Error Types:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-error" />
                  <strong>Errors:</strong> Critical issues that prevent code execution
                </li>
                <li className="flex items-center gap-2">
                  <Bug className="w-4 h-4 text-warning" />
                  <strong>Warnings:</strong> Potential problems that should be addressed
                </li>
                <li className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-primary" />
                  <strong>Suggestions:</strong> Code improvements and best practices
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Quick Actions:</h4>
              <p className="text-muted-foreground">
                Click on any issue to see detailed explanations and suggested fixes. 
                Use the "Quick Fix" button when available to automatically resolve issues.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};