import { CellProps, CellView, useDelRowCallback } from '@/schema';
import { LuTrash } from 'react-icons/lu';
import { toast } from 'sonner';
import { Button } from './ui/Button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';

export const NoteDelete = (props: typeof CellProps) => {

    const removeRow = useDelRowCallback(
        "notes",
        props.rowId,
        undefined,
        () => {
            toast.success(`Note is removed`);
        }
    );

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" className="rounded-lg px-2 py-1 text-danger hover:bg-dangerForeground">
                    <LuTrash className="mr-2 size-4" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Note </DialogTitle>
                    <DialogDescription>
                        Do you want to delete:
                        <span className="block rounded-lg border border-accent bg-foreground p-2 text-primary">
                            <CellView tableId='notes' rowId={props.rowId} cellId='note' />
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant={"danger"}
                        onClick={() => removeRow()}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}