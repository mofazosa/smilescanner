import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Edit, Zap, Heart, Shield, Baby, Users } from "lucide-react";
import type { Tip } from "@shared/schema";

export default function TipsSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: tips, isLoading } = useQuery<Tip[]>({
    queryKey: ['/api/tips', searchQuery ? { search: searchQuery } : {}],
    queryFn: async () => {
      const url = searchQuery 
        ? `/api/tips?search=${encodeURIComponent(searchQuery)}`
        : '/api/tips';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch tips');
      return response.json();
    },
  });

  const getGradientClasses = (color: string) => {
    switch (color) {
      case "dental-blue":
        return "bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]";
      case "health-green":
        return "bg-gradient-to-br from-[#10B981] to-[#059669]";
      case "warm-amber":
        return "bg-gradient-to-br from-[#F59E0B] to-[#D97706]";
      case "purple":
        return "bg-gradient-to-br from-purple-500 to-purple-600";
      case "pink":
        return "bg-gradient-to-br from-pink-500 to-pink-600";
      case "teal":
        return "bg-gradient-to-br from-teal-500 to-teal-600";
      default:
        return "bg-gradient-to-br from-[#2563EB] to-[#1d4ed8]";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "brushing":
        return <Edit className="w-6 h-6" />;
      case "flossing":
        return <Zap className="w-6 h-6" />;
      case "diet":
        return <Heart className="w-6 h-6" />;
      case "prevention":
        return <Shield className="w-6 h-6" />;
      case "gums":
        return <Heart className="w-6 h-6" />;
      case "kids":
        return <Baby className="w-6 h-6" />;
      default:
        return <Users className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Dental Health Tips</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Comprehensive educational resources for maintaining excellent oral health
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tips..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
        </div>
      </div>

      {/* Tips Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips?.map((tip) => (
            <Card 
              key={tip.id} 
              className={`${getGradientClasses(tip.color)} text-white hover:transform hover:scale-105 transition-all duration-300`}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  {getCategoryIcon(tip.category)}
                </div>
                <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
                <p className="text-sm opacity-90 mb-4">{tip.description}</p>
                <ul className="text-sm space-y-1 opacity-90">
                  {tip.content.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tips && tips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tips found matching your search.</p>
        </div>
      )}
    </div>
  );
}
