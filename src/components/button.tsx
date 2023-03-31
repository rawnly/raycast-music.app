import clsx from "clsx";
import React, { FC } from "react";

interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> { }

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={clsx(
          "transition-all duration-150 hover:shadow",
          "px-4 py-2 bg-brand rounded-md text-white font-medium shadow-md shadow-brand/80",
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
