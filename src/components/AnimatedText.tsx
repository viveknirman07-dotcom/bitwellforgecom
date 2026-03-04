import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

interface AnimatedWordsProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  delay?: number;
}

const AnimatedWords = ({
  text,
  className = "",
  as: Tag = "h1",
  stagger = 0.08,
  delay = 0,
}: AnimatedWordsProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });
  const words = text.split(" ");

  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.3em] overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isVisible ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
            transition={{
              duration: 0.6,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

interface AnimatedCharsProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  stagger?: number;
  delay?: number;
}

const AnimatedChars = ({
  text,
  className = "",
  as: Tag = "h2",
  stagger = 0.03,
  delay = 0,
}: AnimatedCharsProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });
  const chars = text.split("");

  return (
    <Tag ref={ref as any} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: 12 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
};

export { AnimatedWords, AnimatedChars };
