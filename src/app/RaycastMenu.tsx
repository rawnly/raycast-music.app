"use client";

import RaycastCMDK, { searchAtom } from "@/components/raycast";
import { Extension } from "@/lib/raycast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import { match } from "ts-pattern";
import {
  Download as InstallIcon,
  GitMerge as ChangelogIcon,
  Users as ContributorsIcon,
} from "lucide-react";
import { useAtom, useSetAtom } from "jotai";

type Page = "main" | "credits" | "changelog";

interface Props {
  extension: Extension;
}

export default function RaycastMenu({ extension }: Props) {
  const router = useRouter();
  const [page, setPage] = useState<Page>("main");
  const [search, setSearch] = useAtom(searchAtom);
  const [lastSearch, setLastSearch] = useState(() => search);

  function goTo(p: Page) {
    setPage(p);

    setLastSearch(search);
    setSearch("");
  }

  const commands = extension.commands.map((cmd) => ({
    kind: "Command",
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

  const onBack = useCallback(() => {
    setPage("main");
    setSearch(lastSearch);
    setLastSearch("");
  }, [setPage, setSearch, lastSearch]);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: -15 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.2, delay: 0 }}
      className="w-full h-full max-h-[400px] max-w-[650px]"
    >
      <RaycastCMDK
        onBack={onBack}
        nested={page !== "main"}
        items={match(page)
          .with("main", () => [
            {
              label: "Favorites",
              items: [
                {
                  title: "Install Extension",
                  value: "install",
                  icon: <InstallIcon className="!w-4 !h-4 opacity-75" />,
                  onSelect() {
                    router.push("raycast://extensions/fedevitaledev/music");
                  },
                },
                {
                  title: "Credits",
                  icon: <ContributorsIcon className="!h-4 !w-4 opacity-75" />,
                  onSelect: () => goTo("credits"),
                },
                {
                  title: "Changelog",
                  icon: <ChangelogIcon className="!w-4 !h-4 opacity-75" />,
                  onSelect: () => goTo("changelog"),
                },
              ],
            },
            {
              label: "Results",
              items: commands,
            },
          ])
          .with("changelog", () => [
            {
              label: "Changelog",
              items: extension.changelog.versions.map((v) => ({
                title: v.title,
                kind: v.date,
                value: v.date,
              })),
            },
          ])
          .with("credits", () => [
            {
              label: "Authors",
              items: [
                {
                  kind: "Author",
                  title: extension.author.name,
                  onSelect: () =>
                    router.push(
                      extension.author.github_handle
                        ? `https://github.com/${extension.author.github_handle}`
                        : extension.author.website ??
                        `https://raycast.com/${extension.author.username}`
                    ),

                  icon: (
                    <div className="overflow-hidden relative w-4 h-4 rounded-full">
                      <Image
                        src={extension.author.avatar}
                        alt={extension.author.name}
                        fill
                      />
                    </div>
                  ),
                },
              ],
            },
            {
              label: "Contributors",
              items: [
                ...extension.contributors.map((contrib) => ({
                  kind: "Contributor",
                  title: contrib.name,
                  onSelect: () =>
                    router.push(
                      contrib.github_handle
                        ? `https://github.com/${contrib.github_handle}`
                        : contrib.website ??
                        `https://raycast.com/${contrib.username}`
                    ),
                  icon: (
                    <div className="overflow-hidden relative w-4 h-4 rounded-full">
                      <Image src={contrib.avatar} alt={contrib.name} fill />
                    </div>
                  ),
                })),
              ],
            },
          ])
          .otherwise(() => [])}
      />
    </motion.div>
  );
}
