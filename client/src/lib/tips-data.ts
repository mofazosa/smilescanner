export const tipCategories = [
  { id: "brushing", name: "Brushing", color: "dental-blue" },
  { id: "flossing", name: "Flossing", color: "health-green" },
  { id: "diet", name: "Diet", color: "warm-amber" },
  { id: "prevention", name: "Prevention", color: "purple" },
  { id: "gums", name: "Gum Care", color: "pink" },
  { id: "kids", name: "Kids", color: "teal" },
];

export const mockAnalysisResults = [
  {
    id: 1,
    title: "Overall Health",
    description: "Based on general dental health indicators",
    status: "good" as const,
    message: "Good foundation for oral health",
    color: "health-green"
  },
  {
    id: 2,
    title: "Hygiene Tips",
    description: "General recommendations for improvement",
    status: "attention" as const,
    message: "Focus on regular brushing routine",
    color: "warm-amber"
  },
  {
    id: 3,
    title: "Education",
    description: "Learn more about dental care",
    status: "info" as const,
    message: "Explore our tips section",
    color: "dental-blue"
  }
];
