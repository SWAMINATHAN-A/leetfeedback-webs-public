import { useState, useEffect, CSSProperties, forwardRef } from "react";

interface ChromaTextProps {
  words: string[];
  colors?: string[];
  interval?: number;
  fadeDelay?: number;
  animationDuration?: number;
  animationDelay?: number;
  fontSize?: string;
  fontFamily?: string;
  fontWeight?: string;
  autoCycle?: boolean;
  className?: string;
  style?: CSSProperties;
}

const ChromaText = forwardRef<HTMLSpanElement, ChromaTextProps>(
  function ChromaText(props, ref) {
    const {
      words,
      colors = [
        "rgb(0, 0, 0)",
        "rgb(0, 0, 0)",
        "rgb(198, 121, 196)",
        "rgb(250, 61, 29)",
        "rgb(255, 176, 5)",
        "rgb(225, 225, 254)",
        "rgb(3, 88, 247)",
        "transparent",
      ],
      interval = 3000,
      fadeDelay = 300,
      animationDuration = 0.9,
      animationDelay = 0.1,
      fontSize = "2.25rem",
      fontFamily = "'Host Grotesk', sans-serif",
      fontWeight = "normal",
      autoCycle = true,
      className = "",
      style = {},
    } = props;
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
      if (!autoCycle) return;
      const intervalId = setInterval(() => {
        setOpacity(0);
        setTimeout(() => {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          setOpacity(1);
        }, fadeDelay);
      }, interval);
      return () => clearInterval(intervalId);
    }, [words.length, interval, fadeDelay, autoCycle]);

    // Generate gradient stops
    const generateGradient = () => {
      const numColors = colors.length;
      const stops = colors.map((color, index) => {
        const position = (index / (numColors - 1)) * 100;
        return `${color} ${position}%`;
      });
      return `linear-gradient(90deg, ${stops.join(", ")})`;
    };

    return (
      <>
        <span
          ref={ref}
          key={words[0]}
          className={`chroma-text chroma-text-animate ${className}`}
          style={{
            display: "inline-flex",
            paddingBottom: "0.1rem",
            ...(fontSize && { fontSize }),
            fontFamily,
            fontWeight,
            opacity,
            ...style,
          }}
        >
          {words[currentWordIndex]}
        </span>
        <style>{`
        .chroma-text {
          background-image: ${generateGradient()};
          background-size: 300% 100%;
          background-position: 100% 0px;
          will-change: background-position;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
        }
        
        .chroma-text-animate {
          animation: ${animationDuration}s ease-in-out ${animationDelay}s forwards chroma-sweep;
          filter: blur(1px);
        }
        
        @keyframes chroma-sweep {
          0% {
            background-position: 100% 0px;
            filter: blur(0px);
          }
          100% {
            background-position: 0px 0px;
            filter: blur(1px);
          }
        }
      `}</style>
      </>
    );
  }
);

ChromaText.displayName = "ChromaText";

export default ChromaText;
