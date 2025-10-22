import { useState } from "react";
import { RadarChart } from "@/components/RadarChart";
import { RadarInputPanel } from "@/components/RadarInputPanel";

interface Segment {
  label: string;
  value: number;
  color: string;
  icon: string;
}

const initialSegments: Segment[] = [
  { label: "Goal Attainment", value: 74.2, color: "purple", icon: "🎯" },
  { label: "Conversation Experience", value: 45.0, color: "orange", icon: "💬" },
  { label: "Integrity", value: 89.3, color: "blue", icon: "🔄" },
  { label: "Operational Reliability", value: 25.8, color: "cyan", icon: "⚙️" },
];

const Index = () => {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);

  const handleApplyChanges = (newSegments: Segment[]) => {
    setSegments(newSegments);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Performance Radar</h1>
          <p className="text-muted-foreground">Visualize metrics across key dimensions</p>
        </div>
        <div className="flex gap-8 items-center justify-center flex-wrap lg:flex-nowrap">
          <RadarChart segments={segments} />
          <RadarInputPanel segments={segments} onApply={handleApplyChanges} />
        </div>
      </div>
    </div>
  );
};

export default Index;
