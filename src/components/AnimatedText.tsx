import { motion, useReducedMotion } from "framer-motion";
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
  stagger = 0.06,
  delay = 0,
}: AnimatedWordsProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as any} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-[0.3em] overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              isVisible
                ? { y: "0%", opacity: 1 }
                : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.7,
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
  stagger = 0.015,
  delay = 0,
}: AnimatedCharsProps) => {
  const { ref, isVisible } = useScrollReveal({ once: true });
  const prefersReduced = useReducedMotion();
  const chars = text.split("");

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={ref as any} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          initial={{ opacity: 0, y: 18 }}
          animate={
            isVisible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 18 }
          }
          transition={{
            duration: 0.45,
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
