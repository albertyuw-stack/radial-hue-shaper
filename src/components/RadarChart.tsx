import { Card } from "@/components/ui/card";

interface Segment {
  label: string;
  value: number;
  color: string;
  icon: string;
}

const segments: Segment[] = [
  { label: "Goal Attainment", value: 74.2, color: "purple", icon: "🎯" },
  { label: "Conversation Experience", value: 45.0, color: "orange", icon: "💬" },
  { label: "Integrity", value: 89.3, color: "blue", icon: "🔄" },
  { label: "Operational Reliability", value: 25.8, color: "cyan", icon: "⚙️" },
];

export const RadarChart = () => {
  const size = 400;
  const center = size / 2;
  const maxRadius = 160;
  const innerRadius = 40;
  const rings = 5;

  // Calculate path for a segment arc
  const createArcPath = (
    startAngle: number,
    endAngle: number,
    innerR: number,
    outerR: number
  ): string => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = center + innerR * Math.cos(startRad);
    const y1 = center + innerR * Math.sin(startRad);
    const x2 = center + outerR * Math.cos(startRad);
    const y2 = center + outerR * Math.sin(startRad);
    const x3 = center + outerR * Math.cos(endRad);
    const y3 = center + outerR * Math.sin(endRad);
    const x4 = center + innerR * Math.cos(endRad);
    const y4 = center + innerR * Math.sin(endRad);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `
      M ${x1} ${y1}
      L ${x2} ${y2}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x3} ${y3}
      L ${x4} ${y4}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${x1} ${y1}
      Z
    `;
  };

  const getColorClass = (color: string, ring: number): string => {
    const colorMap: { [key: string]: string[] } = {
      purple: [
        "hsl(var(--radar-purple-1))",
        "hsl(var(--radar-purple-2))",
        "hsl(var(--radar-purple-3))",
        "hsl(var(--radar-purple-4))",
        "hsl(var(--radar-purple-5))",
      ],
      orange: [
        "hsl(var(--radar-orange-1))",
        "hsl(var(--radar-orange-2))",
        "hsl(var(--radar-orange-3))",
        "hsl(var(--radar-orange-4))",
        "hsl(var(--radar-orange-5))",
      ],
      blue: [
        "hsl(var(--radar-blue-1))",
        "hsl(var(--radar-blue-2))",
        "hsl(var(--radar-blue-3))",
        "hsl(var(--radar-blue-4))",
        "hsl(var(--radar-blue-5))",
      ],
      cyan: [
        "hsl(var(--radar-cyan-1))",
        "hsl(var(--radar-cyan-2))",
        "hsl(var(--radar-cyan-3))",
        "hsl(var(--radar-cyan-4))",
        "hsl(var(--radar-cyan-5))",
      ],
    };
    return colorMap[color][ring];
  };

  const getLabelColor = (color: string): string => {
    const colorMap: { [key: string]: string } = {
      purple: "bg-purple-50 text-purple-900 border-purple-200",
      orange: "bg-orange-50 text-orange-900 border-orange-200",
      blue: "bg-blue-50 text-blue-900 border-blue-200",
      cyan: "bg-cyan-50 text-cyan-900 border-cyan-200",
    };
    return colorMap[color];
  };

  const getLabelPosition = (index: number) => {
    const positions = [
      { top: "10%", right: "5%", items: "end" },
      { bottom: "35%", right: "5%", items: "end" },
      { bottom: "10%", left: "5%", items: "start" },
      { top: "35%", left: "5%", items: "start" },
    ];
    return positions[index];
  };

  // Calculate if a ring should be filled based on percentage
  const shouldFillRing = (value: number, ringIndex: number): boolean => {
    const ringPercentage = ((ringIndex + 1) * 100) / rings;
    return value >= ringPercentage;
  };

  // Calculate indicator position based on percentage
  const getIndicatorPosition = (segmentIndex: number, value: number) => {
    const angle = (segmentIndex * 90 - 90 + 45) * (Math.PI / 180); // Middle of segment
    const radius = innerRadius + (value / 100) * (maxRadius - innerRadius);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="relative">
        <svg width={size} height={size} className="mx-auto drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={maxRadius + 20}
            fill="hsl(var(--muted))"
            opacity="0.3"
          />

          {/* Draw segments */}
          {segments.map((segment, segmentIndex) => {
            const startAngle = segmentIndex * 90 - 90;
            const endAngle = startAngle + 90;

            return (
              <g key={segmentIndex}>
                {/* Draw 5 rings for each segment */}
                {[...Array(rings)].map((_, ringIndex) => {
                  const ringInnerRadius =
                    innerRadius + (ringIndex * (maxRadius - innerRadius)) / rings;
                  const ringOuterRadius =
                    innerRadius + ((ringIndex + 1) * (maxRadius - innerRadius)) / rings;

                  const isFilled = shouldFillRing(segment.value, ringIndex);

                  return (
                    <path
                      key={ringIndex}
                      d={createArcPath(startAngle, endAngle, ringInnerRadius, ringOuterRadius)}
                      fill={
                        isFilled
                          ? getColorClass(segment.color, ringIndex)
                          : "hsl(var(--radar-grey))"
                      }
                      stroke="white"
                      strokeWidth="1"
                      opacity="0.9"
                      className="transition-opacity hover:opacity-100"
                    />
                  );
                })}

                {/* Value indicator dot */}
                {(() => {
                  const { x, y } = getIndicatorPosition(segmentIndex, segment.value);
                  return (
                    <>
                      <circle
                        cx={x}
                        cy={y}
                        r="6"
                        fill="white"
                        stroke={getColorClass(segment.color, 2)}
                        strokeWidth="3"
                        className="drop-shadow-md"
                      />
                      <circle cx={x} cy={y} r="3" fill={getColorClass(segment.color, 1)} />
                    </>
                  );
                })()}
              </g>
            );
          })}

          {/* Center white circle */}
          <circle cx={center} cy={center} r={innerRadius} fill="white" />

          {/* Grid circles */}
          {[...Array(rings)].map((_, i) => {
            const r = innerRadius + ((i + 1) * (maxRadius - innerRadius)) / rings;
            return (
              <circle
                key={i}
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="white"
                strokeWidth="1.5"
                opacity="0.5"
              />
            );
          })}

          {/* Grid lines */}
          {segments.map((_, i) => {
            const angle = (i * 90 - 90) * (Math.PI / 180);
            const x = center + maxRadius * Math.cos(angle);
            const y = center + maxRadius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="white"
                strokeWidth="1.5"
                opacity="0.5"
              />
            );
          })}
        </svg>

        {/* Labels */}
        {segments.map((segment, index) => {
          const position = getLabelPosition(index);
          return (
            <Card
              key={index}
              className={`absolute ${getLabelColor(segment.color)} border p-4 rounded-xl shadow-md min-w-[180px]`}
              style={position}
            >
              <div className={`flex ${position.items === "end" ? "flex-row-reverse" : "flex-row"} items-center gap-3`}>
                <span className="text-2xl">{segment.icon}</span>
                <div className={position.items === "end" ? "text-right" : "text-left"}>
                  <div className="font-semibold text-sm leading-tight">{segment.label}</div>
                  <div className="text-2xl font-bold mt-1">{segment.value}%</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
