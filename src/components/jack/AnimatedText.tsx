import { type CSSProperties, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function Character({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none">
        {char}
      </motion.span>
    </span>
  );
}

export function AnimatedText({ text, className = "", style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  const words = text.split(" ");
  const totalChars = text.length;
  let charCounter = 0;

  return (
    <p ref={containerRef} className={className} style={style}>
      {words.map((word, wordIdx) => {
        const wordChars = word.split("");
        const wordElement = (
          <span key={wordIdx} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIdx) => {
              const start = charCounter / totalChars;
              const end = Math.min(1, start + 1 / totalChars);
              charCounter++;
              return (
                <Character
                  key={charIdx}
                  char={char}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
            {wordIdx < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
        charCounter++; // for the space
        return wordElement;
      })}
    </p>
  );
}
