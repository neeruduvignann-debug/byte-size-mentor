import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "@/components/CodeEditor";
import { TutorialSidebar } from "@/components/TutorialSidebar";
import { ErrorPanel } from "@/components/ErrorPanel";
import { AnalysisResults } from "@/components/AnalysisResults";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Code, Sparkles, Users, Trophy, BookOpen, Menu, X } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentCode, setCurrentCode] = useState("");

  const handleCodeChange = (code: string) => {
    setCurrentCode(code);
  };

  const handleRunCode = (code: string) => {
    console.log("Running code:", code);
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="border-b border-card-border bg-card/80 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary-foreground" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Vignan's Code Mentor
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>12 Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Trophy className="w-4 h-4" />
                  <span>850 Points</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>15k+ Students</span>
                </div>
              </div>
              
              <Button className="bg-gradient-primary glow-primary hover:shadow-glow transition-smooth">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Pro
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Tutorial Sidebar */}
          <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden`}>
            <TutorialSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Welcome Section */}
            <Card className="p-6 bg-gradient-to-r from-primary/10 to-primary-glow/10 border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Welcome back to Vignan's Code Mentor!</h2>
                  <p className="text-muted-foreground">
                    Continue your coding journey with interactive tutorials, real-time analysis, and hands-on exercises.
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center glow-primary">
                    <Code className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Main Interface Tabs */}
            <Tabs defaultValue="editor" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="editor" className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Code Editor
                </TabsTrigger>
                <TabsTrigger value="exercises" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Exercises
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Analysis
                </TabsTrigger>
                <TabsTrigger value="debug" className="flex items-center gap-2">
                  <Menu className="w-4 h-4" />
                  Debug
                </TabsTrigger>
              </TabsList>

              <TabsContent value="editor" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <CodeEditor 
                      onCodeChange={handleCodeChange}
                      onRunCode={handleRunCode}
                    />
                  </div>
                  <div>
                    <AnalysisResults />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="exercises">
                <ExerciseCard />
              </TabsContent>

              <TabsContent value="analysis">
                <AnalysisResults />
              </TabsContent>

              <TabsContent value="debug">
                <ErrorPanel />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
