"use client";

import React, { useId } from "react";
import { useTheme } from "next-themes";
import { Command } from "cmdk";
import { ArrowLeft } from "lucide-react";
import { atom, useAtom } from "jotai";

type Item =
  | {
    icon?: JSX.Element;
    title: string;
    kind?: string;
    value?: string;
    onSelect?(): void;
    disabled?: boolean;
  }
  | {
    label: string;
    items: Exclude<Item, { label: string }>[];
  };

interface Props {
  items: Item[];
  onBack?(): void;
  nested?: boolean;
}

export const searchAtom = atom<string>("");

export default function RaycastCMDK(props: Props) {
  const { resolvedTheme: theme } = useTheme();
  const [value, setValue] = React.useState("install");
  const [search, setSearch] = useAtom(searchAtom);

  const id = useId();

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onKeyDown = React.useCallback(
    function onKeyDown(e: any) {
      if (e.key === "Escape") {
        props.onBack?.();
        return;
      }

      if (e.key === "Backspace" && e.target.value === "") {
        props.onBack?.();
        return;
      }
    },
    [props]
  );

  React.useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!inputRef.current) return;

    const ref = inputRef.current;

    ref.addEventListener("keydown", onKeyDown);

    return () => {
      ref.removeEventListener("keydown", onKeyDown);
    };
  }, [inputRef, onKeyDown]);

  return (
    <div className="raycast">
      <Command value={value} onValueChange={(v) => setValue(v)}>
        <div cmdk-raycast-top-shine="" />
        <div className="flex gap-x-3 justify-start items-center px-4">
          {props.nested && (
            <button
              onClick={props.onBack}
              className="py-1 px-1.5 rounded text-[--gray12] bg-[--gray5]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <Command.Input
            ref={inputRef}
            onValueChange={setSearch}
            value={search}
            autoFocus
            placeholder="Search for commands..."
            className="py-2"
          />
        </div>
        <hr cmdk-raycast-loader="" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          {props.items.map((item, idx) =>
            "label" in item ? (
              <Command.Group key={item.label} heading={item.label}>
                {item.items.map((item, idx) => (
                  <Item
                    key={idx}
                    kind={item.kind}
                    value={item.value ?? item.title}
                    onSelect={item.onSelect}
                  >
                    {item.icon}
                    {item.title}
                  </Item>
                ))}
              </Command.Group>
            ) : (
              <Item kind={item.kind} key={id} value={item.value ?? item.title}>
                {item.icon}
                {item.title}
              </Item>
            )
          )}
        </Command.List>

        <div cmdk-raycast-footer="">
          {theme === "dark" ? <RaycastDarkIcon /> : <RaycastLightIcon />}

          <button cmdk-raycast-open-trigger="">
            Open Command
            <kbd>↵</kbd>
          </button>

          <hr />

          <button cmdk-raycast-subcommand-trigger="">
            Actions
            <kbd>⌘</kbd>
            <kbd>K</kbd>
          </button>
        </div>
      </Command>
    </div>
  );
}

function Item({
  children,
  value,
  onSelect,
  disabled = false,
  kind = "Command",
}: {
  children: React.ReactNode;
  onSelect?(value: string): void;
  value: string;
  disabled?: boolean;
  kind?: string;
}) {
  return (
    <Command.Item
      className="disabled:opacity-50"
      disabled={disabled}
      value={value}
      onSelect={onSelect}
    >
      {children}
      <span cmdk-raycast-meta="">{kind ?? "Command"}</span>
    </Command.Item>
  );
}

function RaycastLightIcon() {
  return (
    <svg
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M934.302 511.971L890.259 556.017L723.156 388.902V300.754L934.302 511.971ZM511.897 89.5373L467.854 133.583L634.957 300.698H723.099L511.897 89.5373ZM417.334 184.275L373.235 228.377L445.776 300.923H533.918L417.334 184.275ZM723.099 490.061V578.209L795.641 650.755L839.74 606.652L723.099 490.061ZM697.868 653.965L723.099 628.732H395.313V300.754L370.081 325.987L322.772 278.675L278.56 322.833L325.869 370.146L300.638 395.379V446.071L228.097 373.525L183.997 417.627L300.638 534.275V634.871L133.59 467.925L89.4912 512.027L511.897 934.461L555.996 890.359L388.892 723.244H489.875L606.516 839.892L650.615 795.79L578.074 723.244H628.762L653.994 698.011L701.303 745.323L745.402 701.221L697.868 653.965Z"
        fill="#FF6363"
      />
    </svg>
  );
}

function RaycastDarkIcon() {
  return (
    <svg
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M301.144 634.799V722.856L90 511.712L134.244 467.804L301.144 634.799ZM389.201 722.856H301.144L512.288 934L556.34 889.996L389.201 722.856ZM889.996 555.956L934 511.904L512.096 90L468.092 134.052L634.799 300.952H534.026L417.657 184.679L373.605 228.683L446.065 301.144H395.631V628.561H723.048V577.934L795.509 650.395L839.561 606.391L723.048 489.878V389.105L889.996 555.956ZM323.17 278.926L279.166 322.978L326.385 370.198L370.39 326.145L323.17 278.926ZM697.855 653.61L653.994 697.615L701.214 744.834L745.218 700.782L697.855 653.61ZM228.731 373.413L184.679 417.465L301.144 533.93V445.826L228.731 373.413ZM578.174 722.856H490.07L606.535 839.321L650.587 795.269L578.174 722.856Z"
        fill="#FF6363"
      />
    </svg>
  );
}
