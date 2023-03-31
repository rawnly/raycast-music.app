"use client";

import L from "next/link";
import Button from "./button";
import { motion, Transition } from "framer-motion";

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
  duration: 0.2,
  bounce: 0.1,
  type: "spring",
};

const Link = motion(L);

export default function Hero() {
  return (
    <div className="text-center md:text-right">
      <motion.h1
        variants={variants}
        animate="visible"
        initial="hidden"
        className="text-5xl font-bold max-w-[500px]"
      >
        The <i>only</i> Music extension you need
      </motion.h1>
      <ul className="mt-6 text-xl font-medium">
        <motion.li
          variants={variants}
          transition={transition}
          initial="hidden"
          animate="visible"
        >
          It works offline
        </motion.li>
        <motion.li
          variants={variants}
          transition={transition}
          initial="hidden"
          animate="visible"
        >
          View and manage your playlists
        </motion.li>
        <motion.li
          variants={variants}
          transition={transition}
          initial="hidden"
          animate="visible"
        >
          Easy Music playback controls
        </motion.li>
      </ul>
      <Link
        animate="visible"
        initial="hidden"
        variants={variants}
        href={"raycast://extensions/fedevitaledev/music"}
      >
        <Button className="mt-4">Add to Raycast</Button>
      </Link>
    </div>
  );
}
