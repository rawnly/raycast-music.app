"use client";

import RaycastCMDK, { searchAtom } from "@/components/raycast";
import { Contributor, Extension } from "@/lib/raycast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useCallback, useState } from "react";
import { match } from "ts-pattern";
import {
  Download as InstallIcon,
  GitMerge as ChangelogIcon,
  Users as ContributorsIcon,
  Sun,
  Moon,
  Monitor,
  Github,
  ShoppingBag as StoreIcon,
} from "lucide-react";
import { useAtom } from "jotai";
import MenuFooter from "./footer";
import { useTheme } from "next-themes";

type Page = "main" | "credits" | "changelog";

interface Props {
  extension: Extension;
}

function getContributorUrl({ github_handle, website, username }: Contributor) {
  return github_handle
    ? `https://github.com/${github_handle}`
    : website ?? `https://raycast.com/${username}`;
}

export default function RaycastWindow({ extension }: Props) {
  const router = useRouter();
  const [page, setPage] = useState<Page>("main");
  const [search, setSearch] = useAtom(searchAtom);
  const [lastSearch, setLastSearch] = useState(() => search);
  const { setTheme, theme, resolvedTheme } = useTheme();

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
    <div className="space-y-4 w-full max-w-[640px]">
      <motion.div
        initial={{ opacity: 0, translateY: -15 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
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
                    onSelect: () => router.push(`/install`),
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
                  {
                    title: "View on the store",
                    value: "store",
                    icon: <StoreIcon className="!w-4 !h-4 opacity-75" />,
                    onSelect: () => router.push(extension.store_url),
                  },
                  {
                    title: "Toggle Theme",
                    onSelect: () =>
                      setTheme(resolvedTheme === "dark" ? "light" : "dark"),
                    icon: match(theme)
                      .with("dark", () => (
                        <Sun className="!w-4 !h-4 opacity-75" />
                      ))
                      .with("system", () => (
                        <Monitor className="!w-4 !h-4 opacity-75" />
                      ))
                      .otherwise(() => (
                        <Moon className="!w-4 !h-4 opacity-75" />
                      )),
                  },
                  {
                    title: "Source",
                    icon: <Github className="!w-4 !h-4 opacity-75" />,
                    onSelect: () =>
                      router.push(
                        "https://github.com/raycast/extensions/tree/main/extensions/music",
                      ),
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
                    onSelect: async () => {
                      router.push(getContributorUrl(extension.author));
                    },
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
                    onSelect: async () => {
                      router.push(getContributorUrl(contrib));
                    },
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
      <div className="text-center">
        <MenuFooter extension={extension} />
      </div>
    </div>
  );
}
