import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";

interface AnalysisResult {
  id: number;
  title: string;
  description: string;
  status: "good" | "attention" | "info";
  message: string;
  color: string;
}

interface AnalysisData {
  uploadId: number;
  results: AnalysisResult[];
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

export default function AnalysisResults({ data }: AnalysisResultsProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-6 h-6 text-[#10B981]" />;
      case "attention":
        return <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />;
      case "info":
        return <Info className="w-6 h-6 text-[#2563EB]" />;
      default:
        return <Info className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case "health-green":
        return "bg-[#10B981]/10 text-[#10B981]";
      case "warm-amber":
        return "bg-[#F59E0B]/10 text-[#F59E0B]";
      case "dental-blue":
        return "bg-[#2563EB]/10 text-[#2563EB]";
      default:
        return "bg-[#2563EB]/10 text-[#2563EB]";
    }
  };

  const getIconBgClasses = (color: string) => {
    switch (color) {
      case "health-green":
        return "bg-[#10B981]/10";
      case "warm-amber":
        return "bg-[#F59E0B]/10";
      case "dental-blue":
        return "bg-[#2563EB]/10";
      default:
        return "bg-[#2563EB]/10";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Analysis Results</h2>
        <p className="text-lg text-gray-600">Educational insights based on general dental health principles</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.results.map((result) => (
          <Card key={result.id} className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconBgClasses(result.color)}`}>
                  {getStatusIcon(result.status)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 ml-3">{result.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{result.description}</p>
              <div className={`p-3 rounded-lg ${getColorClasses(result.color)}`}>
                <p className="text-sm font-medium">{result.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
