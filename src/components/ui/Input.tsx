import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<div className="relative">
				<input
					type={type}
					dir="auto"
					className={cn(
						"flex h-10 w-full border border-accent bg-foreground/30 rounded-md px-3 py-1 text-sm text-primary file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-secondary focus-visible:outline-none focus-visible:ring-1",
						className
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
