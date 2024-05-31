import { CellProps, CellView, RowView, useRowIds } from "@/schema"
import { Link } from "@tanstack/react-router"
import { LuMoreVertical } from "react-icons/lu"
import { PersonDelete } from "./PersonDelete"
import { PersonUpdate } from "./PersonUpdate"
import { Button } from "./ui/Button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover"

export function PersonRead() {
    const personRowIds = useRowIds("person")
    return (
        <div className="space-y-3 border-b border-accent p-2 md:border-b-0 md:border-r">
            {personRowIds.map((rowId) => (
                <RowView
                    key={rowId}
                    tableId={"person"}
                    rowId={rowId}
                    cellComponent={customCell} />
            ))}
        </div>
    )
}

function customCell(props: typeof CellProps) {
    return (
        <div className="flex justify-between gap-6">
            <Link
                to="/person/$person"
                activeProps={{ className: "font-semibold text-primary" }}
                inactiveProps={{ className: "text-secondary" }}
                params={{ person: props.rowId }}>
                <CellView {...props} />
            </Link>
            <Popover>
                <PopoverTrigger asChild>
                    <Button type="button" className="text-primary">
                        <LuMoreVertical className="size-4" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-1 p-1" align="end">
                    <PersonUpdate {...props} />
                    <PersonDelete {...props} />
                </PopoverContent>
            </Popover>
        </div>
    )
}