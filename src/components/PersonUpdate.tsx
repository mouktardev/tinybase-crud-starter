import { CellProps, CellView, useSetPartialRowCallback, useSliceIds, } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { LuPenLine, } from "react-icons/lu"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "./ui/Button"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/Dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/Form"
import { Input } from "./ui/Input"

const PersonFormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
});

export function PersonUpdate(props: typeof CellProps) {
    const [open, setOpen] = useState<boolean>(false);
    const persons = useSliceIds("by_person")
    const form = useForm<z.infer<typeof PersonFormSchema>>({
        resolver: zodResolver(PersonFormSchema),
        defaultValues: {
            name: "",
        },
    });
    const renameRow = useSetPartialRowCallback(
        props.tableId,
        props.rowId,
        (e: z.infer<typeof PersonFormSchema>) => ({
            name: e.name,
        }),
        [],
        undefined,
        (store) => {
            const name = store.getCell("person", props.rowId, 'name')
            toast.success(`renamed to: ${name}`)
        }
    );


    function onSubmit(values: z.infer<typeof PersonFormSchema>) {
        if (persons.map((person) => person.toLowerCase()).includes(values.name.toLowerCase())) {
            toast.error("cannot rename to an existing person")
        } else {
            renameRow(values);
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" className="justify-start rounded-lg px-2 py-1 text-primary hover:bg-accent">
                    <LuPenLine className="mr-2 size-4" />
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rename</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Rename Person :{" "}
                                        <span className="font-bold text-primary">
                                            <CellView {...props} />
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder="add a person" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    type="button"
                                    variant={"danger"}
                                    className="text-primary"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant={"success"}
                                className="text-primary"
                            >
                                Rename
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}