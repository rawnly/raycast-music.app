"use client";

import L from "next/link";
import Button from "./button";
import { motion, Transition } from "framer-motion";
import { Inter } from "next/font/google";
import clsx from "clsx";
import { Check } from "lucide-react";

const inter = Inter({
  subsets: ["latin"],
});

const variants = {
  visible: {
    opacity: 1,
    translateX: 0,
  },
  hidden: {
    opacity: 0,
    translateX: 15,
  },
};

const transition: Transition = {
  duration: 0.25,
  bounce: 0.1,
  type: "tween",
};

const Link = motion(L);

const ListItem = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.li
    variants={variants}
    transition={{ ...transition, delay }}
    initial="hidden"
    animate="visible"
    className="flex flex-row-reverse gap-2 justify-start items-center"
  >
    <Check className="hidden w-4 h-4 lg:block" />
    {children}
  </motion.li>
);

const features = [
  "It works offline",
  "View and manage your playlists",
  "Easy Music playback controls",
];

export default function Hero() {
  return (
    <div className={clsx("text-center lg:text-right", inter.className)}>
      <motion.h1
        variants={variants}
        animate="visible"
        initial="hidden"
        className="text-5xl font-bold max-w-[500px]"
      >
        The{" "}
        <i className="font-serif" style={{ fontWeight: 400 }}>
          only
        </i>{" "}
        Music extension you need
      </motion.h1>
      <ul className="hidden mt-6 text-xl font-medium lg:block">
        {features.map((f, idx) => (
          <ListItem key={f} delay={0.1 * idx}>
            {f}
          </ListItem>
        ))}
      </ul>
      <Link
        prefetch={false}
        animate="visible"
        initial="hidden"
        variants={variants}
        href={"/install"}
      >
        <Button className="mt-4">Add to Raycast</Button>
      </Link>
    </div>
  );
}
