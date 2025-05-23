// src/components/airspace/AirspaceDisplay.tsx
"use client";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { DotTrail } from "./DotTrail";
import { Dot } from "./types";
import { generatePaths } from "./utils";

export const AirspaceDisplay = () => {
  const { theme } = useTheme();
  const paths = useMemo(() => generatePaths(), []);
  const [dots, setDots] = useState<Dot[]>([]);
  const [isClient, setIsClient] = useState(false);

  const createDot = useMemo(() => {
    return (path: [{ x: number; y: number }, { x: number; y: number }]) => ({
      id: Date.now(),
      startX: path[0].x,
      startY: path[0].y,
      endX: path[1].x,
      endY: path[1].y,
      progress: 0,
      trail: [],
      size: 1 + Math.random() * 0.5,
      opacity: 1,
    });
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        const pathIndex = Math.floor(Math.random() * paths.length);
        const newDot = createDot(paths[pathIndex]);
        setDots((current) => [...current, newDot]);
      }, 2000);
      return () => clearInterval(interval);
    }, 100);
    return () => clearTimeout(initialDelay);
  }, [paths, createDot]);

  useEffect(() => {
    const animationFrame = setInterval(() => {
      setDots(
        (current) =>
          current
            .map((dot) => {
              const progress = dot.progress + 0.003;
              const opacity = progress > 0.7 ? Math.max(0, 1 - (progress - 0.7) / 0.3) : dot.opacity;
              if (progress >= 1) return null;
              const x = dot.startX + (dot.endX - dot.startX) * progress;
              const y = dot.startY + (dot.endY - dot.startY) * progress;
              const trail = [...dot.trail];
              if (progress % 0.1 < 0.003) {
                trail.push({ x, y, age: 0 });
              }
              const updatedTrail = trail.map((point) => ({ ...point, age: point.age + 0.01 })).filter((point) => point.age < 1);
              return { ...dot, progress, trail: updatedTrail, opacity };
            })
            .filter(Boolean) as Dot[]
      );
    }, 64);
    return () => clearInterval(animationFrame);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="-250 -250 500 500" />
      </div>
    );
  }

  const strokeColor = theme === "light" ? "black" : "white";
  const strokeOpacity = theme === "light" ? "0.3" : "0.2";

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="-250 -250 500 500">
        {paths.map((points, index) => (
          <path
            key={index}
            d={`M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`}
            fill="none"
            stroke={strokeColor}
            strokeWidth="0.5"
            strokeDasharray="4 4"
            style={{ opacity: strokeOpacity }}
          />
        ))}
        {dots.map((dot) => {
          const x = dot.startX + (dot.endX - dot.startX) * dot.progress;
          const y = dot.startY + (dot.endY - dot.startY) * dot.progress;
          return <DotTrail key={dot.id} dot={dot} x={x} y={y} themeColor={strokeColor} />;
        })}
      </svg>
    </div>
  );
};
