import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Shield, Zap, Target, Award, Code } from "lucide-react";

const codeQualityData = [
  { name: "Readability", score: 85 },
  { name: "Maintainability", score: 78 },
  { name: "Performance", score: 92 },
  { name: "Security", score: 88 },
  { name: "Best Practices", score: 81 }
];

const complexityData = [
  { name: "Simple", value: 65, color: "#10b981" },
  { name: "Moderate", value: 25, color: "#f59e0b" },
  { name: "Complex", value: 10, color: "#ef4444" }
];

const metricsData = [
  { metric: "Lines of Code", value: "247", change: "+12" },
  { metric: "Cyclomatic Complexity", value: "3.2", change: "-0.8" },
  { metric: "Test Coverage", value: "87%", change: "+5%" },
  { metric: "Code Duplication", value: "2.1%", change: "-1.2%" }
];

export const AnalysisResults = () => {
  return (
    <Card className="border-card-border">
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Code Analysis Results</h3>
          </div>
          <Badge className="bg-gradient-success glow-success">
            Overall Score: A-
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="quality" className="h-96">
        <TabsList className="grid w-full grid-cols-4 m-6 mb-0">
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="complexity">Complexity</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="quality" className="p-6 pt-4">
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-4 text-muted-foreground uppercase tracking-wide">
                Code Quality Metrics
              </h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={codeQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={12}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      fontSize={12}
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Bar 
                      dataKey="score" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-success/10 border-success/20">
                <div className="flex items-center gap-3">
                  <Shield className="w-8 h-8 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Security Score</p>
                    <p className="text-2xl font-bold text-success">88/100</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="text-2xl font-bold text-primary">92/100</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="p-6 pt-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Key Metrics
            </h4>
            {metricsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-card border">
                <div className="flex items-center gap-3">
                  <Code className="w-5 h-5 text-primary" />
                  <span className="font-medium">{item.metric}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{item.value}</span>
                  <Badge 
                    variant="secondary" 
                    className={item.change.startsWith('+') ? 
                      "text-success bg-success/20" : 
                      "text-warning bg-warning/20"
                    }
                  >
                    {item.change}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="complexity" className="p-6 pt-4">
          <div className="space-y-6">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Code Complexity Distribution
            </h4>
            
            <div className="flex items-center justify-center">
              <div className="h-48 w-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complexityData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {complexityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {complexityData.map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-4 h-4 rounded-full mx-auto mb-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-lg font-bold">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="p-6 pt-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              AI-Powered Insights
            </h4>
            
            <div className="space-y-4">
              <Card className="p-4 bg-success/10 border-success/20">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Great Job!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Your code follows most JavaScript best practices. Performance is excellent with efficient algorithms.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-warning/10 border-warning/20">
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">Room for Improvement</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Consider adding more comments for complex logic and reducing function complexity in the data processing module.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-primary">Next Steps</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try implementing error handling patterns and consider adding unit tests for better code reliability.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};