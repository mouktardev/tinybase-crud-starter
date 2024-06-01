import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { Variants } from "framer-motion";
import { MotionProps, motion } from "framer-motion";
import React, { ForwardedRef, useState } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
    MotionProps &
    VariantProps<typeof buttonVariants> & {
        onStart?: () => void;
        className?: string;
    };

const pushButton: Variants = {
    unpressed: {
        scale: [null, 0.85, 1],
        opacity: 1,
    },
    pressed: {
        scale: 0.85,
        opacity: 0.7,
        transition: {
            type: "spring",
            duration: 0.3,
            bounce: 0.5,
        },
    },
};
const buttonVariants = cva(
    "inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
    {
        variants: {
            variant: {
                outline:
                    "rounded-lg border border-accent bg-foreground px-2 py-1 text-primary disabled:text-primary/50",
                danger:
                    "rounded-lg border border-danger/20 bg-dangerForeground px-2 py-1 font-bold text-danger",
                success:
                    "rounded-lg border border-success/20 bg-successForeground px-2 py-1 font-bold text-success",
                action:
                    "rounded-lg border border-action/20 bg-action px-2 py-1 font-bold text-primary disabled:bg-foreground disabled:text-secondary",
            },
        },
    }
);

export const Button = React.forwardRef(
    (
        { className, variant, onStart, ...props }: Props,
        ref: ForwardedRef<HTMLButtonElement>
    ) => {
        const [pressing, setPressing] = useState(false);

        return (
            <motion.button
                ref={ref}
                variants={pushButton}
                initial={false}
                animate={pressing ? "pressed" : "unpressed"}
                transition={{ type: "spring", duration: 0.3, bounce: 0.5 }}
                onTapStart={() => {
                    setPressing(true);
                    onStart;
                }}
                onTap={() => {
                    setPressing(false);
                }}
                onTapCancel={() => {
                    setPressing(false);
                }}
                className={cn(buttonVariants({ variant, className }))}
                {...props}
            />
        );
    }
);
