import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn("p-3", className)}
			classNames={{
				months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
				month: "space-y-4",
				caption: "flex justify-center pt-1 relative items-center",
				caption_label: "text-sm font-medium",
				nav: "space-x-1 flex items-center",
				nav_button: cn(
					"border border-secondary bg-transparent p-1 opacity-50 hover:opacity-100"
				),
				nav_button_previous: "absolute left-1",
				nav_button_next: "absolute right-1",
				table: "w-full border-collapse space-y-1",
				head_row: "flex",
				head_cell: "text-secondary rounded-md w-8 font-normal text-[0.8rem]",
				row: "flex w-full mt-2",
				cell: cn(
					"relative p-0 text-center hover:bg-foreground text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-foreground [&:has([aria-selected].day-outside)]:bg-foreground/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
					props.mode === "range"
						? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
						: "[&:has([aria-selected])]:rounded-md"
				),
				day: "size-8 p-0 font-normal aria-selected:opacity-100",
				day_range_start: "day-range-start",
				day_range_end: "day-range-end",
				day_selected:
					"bg-foreground text-primary hover:bg-foreground hover:text-primary",
				day_today: "bg-mute text-primary",
				day_outside:
					"day-outside text-secondary opacity-50  aria-selected:bg-mute/50 aria-selected:text-secondary aria-selected:opacity-30",
				day_disabled: "text-secondary opacity-50",
				day_range_middle: "aria-selected:bg-mute aria-selected:text-primary",
				day_hidden: "invisible",
				...classNames,
			}}
			components={{
				IconLeft: () => <RxChevronLeft className="size-4" />,
				IconRight: () => <RxChevronRight className="size-4" />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
