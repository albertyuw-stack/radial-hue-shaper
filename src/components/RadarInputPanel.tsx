import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface Segment {
  label: string;
  value: number;
  color: string;
  icon: string;
}

interface RadarInputPanelProps {
  segments: Segment[];
  onApply: (newSegments: Segment[]) => void;
}

export const RadarInputPanel = ({ segments, onApply }: RadarInputPanelProps) => {
  const [values, setValues] = useState<{ [key: string]: number }>(
    segments.reduce((acc, seg) => ({ ...acc, [seg.label]: seg.value }), {})
  );

  const handleValueChange = (label: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setValues((prev) => ({ ...prev, [label]: numValue }));
    }
  };

  const handleApply = () => {
    const newSegments = segments.map((seg) => ({
      ...seg,
      value: values[seg.label] || seg.value,
    }));
    onApply(newSegments);
  };

  const getInputBorderColor = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      purple: "focus-visible:ring-purple-400 border-purple-200",
      orange: "focus-visible:ring-orange-400 border-orange-200",
      blue: "focus-visible:ring-blue-400 border-blue-200",
      cyan: "focus-visible:ring-cyan-400 border-cyan-200",
    };
    return colorMap[color] || "";
  };

  return (
    <Card className="p-6 w-80 h-fit shadow-lg">
      <h3 className="text-lg font-semibold mb-6 text-foreground">Adjust Metrics</h3>
      <div className="space-y-5">
        {segments.map((segment) => (
          <div key={segment.label} className="space-y-2">
            <Label htmlFor={segment.label} className="flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">{segment.icon}</span>
              {segment.label}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id={segment.label}
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={values[segment.label] || 0}
                onChange={(e) => handleValueChange(segment.label, e.target.value)}
                className={`${getInputBorderColor(segment.color)}`}
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleApply} className="w-full mt-6">
        Apply
      </Button>
    </Card>
  );
};
