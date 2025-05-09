import { cva, type VariantProps } from "class-variance-authority"
import type { FC, Ref } from "react"
import { twMerge } from "tailwind-merge"

export const input = cva(
  twMerge(
    "w-full px-2.5 py-1.5 leading-8",
    "border-1 border-gray-400",
    "focus:outline-1 focus-within:outline-1",
    "focus:border-blue-600 dark:focus:border-blue-400",
    "focus-within:border-blue-600 dark:focus-within:border-blue-400",
    "focus:outline-blue-600 dark:focus:outline-blue-400",
    "focus-within:outline-blue-600 dark:focus-within:outline-blue-400",
  ),
  {
    variants: {
      variant: {
        base: "rounded",
        goast: "border-none focus:outline-0 focus-within:outline-0",
      },
    },
    compoundVariants: [],
    defaultVariants: {
      variant: "base",
    },
  },
)

interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement> & {
        ref?: React.Ref<HTMLInputElement> | null
      },
      "disabled"
    >,
    VariantProps<typeof input> {}

const Input: FC<InputProps> = ({ variant, ref, className, ...props }) => {
  return (
    <input
      ref={ref}
      className={twMerge(input({ variant }), className)}
      {...props}
    />
  )
}

export default Input
