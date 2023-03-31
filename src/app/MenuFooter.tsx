"use client";

import MagicNumber from "@/components/MagicNumber";
import { Extension } from "@/lib/raycast";
import { motion } from "framer-motion";
import { formatNumber, getNumberFormat } from "@/lib/utils";

interface Props {
  extension: Extension;
}

export default function MenuFooter({ extension }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-sm text-gray-500 dark:text-[#3d3d3d]"
    >
      ~
      <MagicNumber
        accent={"#E7515D"}
        value={
          parseInt(
            formatNumber(extension.download_count, 0).replace(/\D/g, "")
          ) ?? extension.download_count
        }
      />
      {getNumberFormat(extension.download_count)} users are using{" "}
      <i className="font-serif font-medium">Raycast Music</i>
    </motion.div>
  );
}
