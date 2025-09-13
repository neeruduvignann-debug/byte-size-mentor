import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, Bug, Eye } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
  onRunCode?: (code: string) => void;
}

export const CodeEditor = ({ 
  initialCode = "// Welcome to Vignan's Code Mentor!\n// Start typing your code here...\n\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));", 
  language = "javascript",
  onCodeChange,
  onRunCode 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOutput("Hello, World!\n✓ Code executed successfully!");
      onRunCode?.(code);
    } catch (error) {
      setOutput(`Error: ${error}`);
    } finally {
      setIsRunning(false);
    }
  };

  const generateLineNumbers = () => {
    const lines = code.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1);
  };

  return (
    <Card className="code-editor border-editor-border p-0 overflow-hidden">
      {/* Editor Header */}
      <div className="flex items-center justify-between p-4 border-b border-editor-border bg-card">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-error"></div>
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <Badge variant="secondary" className="ml-2">
            {language}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-accent"
          >
            <Bug className="w-4 h-4 mr-1" />
            Debug
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="hover:bg-accent"
          >
            <Eye className="w-4 h-4 mr-1" />
            Analyze
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCode(initialCode)}
            className="hover:bg-accent"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
          <Button 
            onClick={handleRunCode}
            disabled={isRunning}
            className="bg-gradient-primary glow-primary hover:shadow-glow transition-smooth"
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex">
        {/* Line Numbers */}
        <div className="code-line-numbers p-4 pr-2 bg-muted/30 select-none">
          {generateLineNumbers().map(num => (
            <div key={num} className="leading-6 text-right">
              {num}
            </div>
          ))}
        </div>

        {/* Code Input */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={handleCodeChange}
            className="w-full h-96 p-4 bg-transparent border-0 outline-0 resize-none font-mono text-sm leading-6 text-foreground placeholder-muted-foreground custom-scrollbar"
            placeholder="Start coding..."
            spellCheck={false}
          />
        </div>
      </div>

      {/* Output Panel */}
      {output && (
        <div className="border-t border-editor-border bg-muted/20">
          <div className="p-4">
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Output:</h4>
            <pre className="font-mono text-sm text-foreground whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>
      )}
    </Card>
  );
};