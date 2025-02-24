
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalysisResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { analysis } = location.state || {};

  if (!analysis) {
    return (
      <div className="space-y-4">
        <Button onClick={() => navigate("/dashboard/analysis")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
        <p>No analysis data available. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={() => navigate("/dashboard/analysis")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Analysis
        </Button>
        <Button onClick={() => window.print()}>
          <Download className="mr-2 h-4 w-4" />
          Download Analysis
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Difficulty Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <PieChart width={400} height={300}>
                <Pie
                  data={analysis.difficulty}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analysis.difficulty.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Topics Covered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {analysis.topics.map((topic: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span>{topic.name}</span>
                  <span className="text-sm text-gray-600">
                    {topic.questionCount} questions
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Detailed Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <h3>Overall Assessment</h3>
              <p>{analysis.overallAssessment}</p>
              
              <h3>Recommendations</h3>
              <ul>
                {analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
