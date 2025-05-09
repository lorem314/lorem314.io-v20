import { cva, type VariantProps } from "class-variance-authority"
import type { FC } from "react"
import { twMerge } from "tailwind-merge"

const button = cva(
  twMerge(
    "inline-flex justify-center items-center leading-6",
    "border-1 rounded transition-[background-color]",
    "break-keep whitespace-nowrap",
  ),
  {
    variants: {
      variant: {
        contained: twMerge(
          "border-transparent px-2.5 py-1.5",
          "text-white dark:text-black",
          "bg-sky-600 dark:bg-blue-300",
          "hover:bg-sky-700 dark:hover:bg-blue-400",
          "active:bg-sky-800 dark:active:bg-blue-500",
        ),
        outline: twMerge(
          "text-current bg-transparent border-current/50 px-2.5 py-1.5",
          "hover:bg-black/10 dark:hover:bg-white/10",
          "active:bg-black/20 dark:active:bg-white/20",
        ),
        icon: twMerge(
          "text-current border-transparent opacity-50 p-1.5",
          "hover:opacity-75",
          "active:opacity-100",
        ),
      },
      size: {
        small: "text-[0.875em]",
        medium: "text-base",
        large: "text-[1.125em]",
      },
      disabled: {
        true: "cursor-not-allowed text-current/38",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        size: "small",
        className: "px-1.5 py-0.5",
      },
      {
        variant: "outline",
        size: "small",
        className: "px-1.5 py-0.5",
      },
    ],
    defaultVariants: {
      variant: "contained",
      size: "medium",
      disabled: false,
    },
  },
)

// interface ButtonProps
//   extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
//     VariantProps<typeof button> {}

const Button: FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>
> = ({ className, variant, size, disabled, ...props }) => {
  return (
    <button
      className={twMerge(button({ variant, size, disabled }), className)}
      disabled={disabled || undefined}
      {...props}
    />
  )
}

export default Button
