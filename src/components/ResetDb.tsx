import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "./ui/Button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog";

export const ResetDb = () => {
    const navigate = useNavigate()
    function deleteIndexDb() {
        const DBDeleteRequest = window.indexedDB.deleteDatabase("store");
        DBDeleteRequest.onsuccess = () => {
            toast.success("database Cleared");
            navigate({ to: '/person', }).then(() => window.location.reload())
        };
        DBDeleteRequest.onerror = () => {
            toast.error("failed to clear database");
        };
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant={"danger"}>
                    Reset data
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Clear database</DialogTitle>
                    <DialogDescription>
                        This will permanently reset all Person and Notes from indexed database and reset it to initial state.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant={"danger"} onClick={deleteIndexDb}>
                            Reset
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}