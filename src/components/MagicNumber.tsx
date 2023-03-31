"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

const OFFSET = 10;

function SingleMagicNumber({
  value,
  accent = "fuchsia",
}: {
  value: string;
  accent?: string;
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const index = useMemo(() => {
    return Math.min(Math.max(0, parseInt(value)), 10);
  }, [value]);

  return (
    <div className="relative">
      <motion.div className="opacity-0">{value}</motion.div>
      <motion.div
        onAnimationStart={() => setIsAnimating(true)}
        onAnimationComplete={() => setIsAnimating(false)}
        initial={{ translateY: `-${OFFSET}%`, opacity: 0 }}
        animate={{ translateY: `-${index * OFFSET}%`, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.8,
        }}
        style={{ color: isAnimating ? accent : undefined }}
        className={clsx(
          "absolute top-0 left-0",
          "pointer-events-none transition-colors flex flex-col"
        )}
      >
        {Array.from(new Array(10)).map((_, idx) => (
          <span className="select-none" key={idx} data-active={index === idx}>
            {idx}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface IMagicNumberProps {
  value: number;
  accent?: string;
}

export default function MagicNumber({ value, ...props }: IMagicNumberProps) {
  const digits = useMemo(() => {
    const chars = value.toString().split("");

    return [
      ...Array.from(new Array(6 - chars.length)).fill(undefined),
      ...chars,
    ];
  }, [value]);

  return (
    <div
      data-value={value}
      className="flex inline-flex overflow-hidden relative tabular-nums"
    >
      {Array.from(new Array(6)).map(
        (_, idx) =>
          digits[idx] && (
            <SingleMagicNumber
              key={idx}
              value={digits?.[idx] ?? "0"}
              {...props}
            />
          )
      )}
    </div>
  );
}
