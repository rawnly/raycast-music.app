"use client";

import RaycastCMDK from "@/components/raycast";
import { Extension } from "@/lib/raycast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  extension: Extension;
}

export default function RaycastMenu({ extension }: Props) {
  const router = useRouter();

  const commands = extension.commands.map((cmd) => ({
    command: true,
    title: cmd.title,
    icon: (
      <div className="relative w-4 h-4">
        <Image
          src={cmd.icons.light ?? extension.icons.light ?? ""}
          alt="icon"
          fill
        />
      </div>
    ),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: 0 }}
      className="w-full h-full max-h-[400px] max-w-[650px]"
    >
      <RaycastCMDK
        items={[
          {
            label: "Favorites",
            items: [
              {
                title: "Install Extension",
                command: true,
                onSelect() {
                  router.push("raycast://extensions/fedevitaledev/music");
                },
              },
            ],
          },
          {
            label: "Results",
            items: commands,
          },
        ]}
      />
    </motion.div>
  );
}
