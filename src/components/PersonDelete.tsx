import { CellProps, CellView, useCell, useDelRowCallback, useLocalRowIds } from "@/schema";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";

export function PersonDelete(props: typeof CellProps) {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false);
    const person = useCell("person", props.rowId, "name")
    const personIdsLinkedToNotes = useLocalRowIds("person_notes", props.rowId);
    const removeRow = useDelRowCallback(
        props.tableId,
        props.rowId,
        undefined,
        () => {
            navigate({ to: '/person', })
            toast.success(`${person} is removed`);
        }
    );
    return (
        <Dialog open={open}
            onOpenChange={(open) =>
                personIdsLinkedToNotes.length === 0
                    ? setOpen(open)
                    : toast.error(`${person} has notes`)
            }>
            <DialogTrigger asChild>
                <Button type="button" className="rounded-lg px-2 py-1 text-danger hover:bg-dangerForeground">
                    <LuTrash className="mr-2 size-4" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete person</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Do you want to delete:{" "}
                    <span className="font-bold text-primary">
                        <CellView {...props} />
                    </span>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant={"danger"}
                            onClick={() => removeRow()}
                        >
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}