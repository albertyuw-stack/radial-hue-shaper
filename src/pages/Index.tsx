import { RadarChart } from "@/components/RadarChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Performance Radar</h1>
          <p className="text-muted-foreground">Visualize metrics across key dimensions</p>
        </div>
        <RadarChart />
      </div>
    </div>
  );
};

export default Index;
