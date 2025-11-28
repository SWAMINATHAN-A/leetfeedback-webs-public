import React, { useEffect, useRef } from "react";

interface GradientMeshProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

const GradientMesh: React.FC<GradientMeshProps> = ({
  className = "",
  colors = ["#4F46E5", "#7C3AED", "#EC4899", "#06B6D4"],
  speed = 0.0015,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const rgbColors = colors.map(hexToRgb);

    const createGradientBlob = (
      x: number,
      y: number,
      radius: number,
      color: { r: number; g: number; b: number }
    ) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`);
      gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`);
      gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      return gradient;
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Clear with subtle base
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.clearRect(0, 0, width, height);

      // Set blend mode for beautiful color mixing
      ctx.globalCompositeOperation = "screen";

      // Animate multiple blobs
      const blobs = [
        {
          x: width * 0.3 + Math.sin(time * 0.7) * width * 0.15,
          y: height * 0.4 + Math.cos(time * 0.5) * height * 0.2,
          radius: Math.min(width, height) * 0.6,
          color: rgbColors[0],
        },
        {
          x: width * 0.7 + Math.cos(time * 0.6) * width * 0.15,
          y: height * 0.3 + Math.sin(time * 0.8) * height * 0.15,
          radius: Math.min(width, height) * 0.5,
          color: rgbColors[1],
        },
        {
          x: width * 0.5 + Math.sin(time * 0.5 + 1) * width * 0.2,
          y: height * 0.7 + Math.cos(time * 0.7 + 1) * height * 0.15,
          radius: Math.min(width, height) * 0.55,
          color: rgbColors[2],
        },
        {
          x: width * 0.2 + Math.cos(time * 0.4 + 2) * width * 0.1,
          y: height * 0.6 + Math.sin(time * 0.6 + 2) * height * 0.1,
          radius: Math.min(width, height) * 0.4,
          color: rgbColors[3],
        },
      ];

      blobs.forEach((blob) => {
        ctx.fillStyle = createGradientBlob(blob.x, blob.y, blob.radius, blob.color);
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalCompositeOperation = "source-over";

      time += speed;
      animationRef.current = requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ filter: "blur(60px) saturate(1.5)" }}
    />
  );
};

export default GradientMesh;
