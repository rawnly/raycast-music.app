import clsx from "clsx";
import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : "button";

    return (
      <Component
        ref={ref}
        {...props}
        className={clsx(
          "transition-all duration-150 hover:shadow",
          "px-4 py-2 bg-brand rounded-md text-white font-medium shadow-md shadow-brand/80",
          className,
        )}
      >
        {children}
      </Component>
    );
  },
);

Button.displayName = "Button";

export default Button;
