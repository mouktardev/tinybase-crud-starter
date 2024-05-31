import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { useAddRowCallback, useSliceIds } from '@/schema';
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const PersonFormSchema = z.object({
    name: z.string().min(2, {
        message: "name must be at least 2 characters.",
    }),
});

export function PersonCreate() {
    const [open, setOpen] = useState<boolean>(false);

    //an index array used to not a allow duplicate person  
    const persons = useSliceIds("by_person")

    const form = useForm<z.infer<typeof PersonFormSchema>>({
        resolver: zodResolver(PersonFormSchema),
        defaultValues: {
            name: "",
        },
    });

    const addRow = useAddRowCallback(
        "person",
        (e: z.infer<typeof PersonFormSchema>) => ({
            name: e.name,
        }),
        [],
        undefined,
        (_, __, row) => {
            const name = row.name
            toast.success(`${name} has been added`)
        }
    );

    function onSubmit(values: z.infer<typeof PersonFormSchema>) {
        if (persons.map((person) => person.toLowerCase()).includes(values.name.toLowerCase())) {
            toast.error("person exist")
        } else {
            addRow(values);
            setOpen(false);
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type='button' variant={'action'}>
                    Add a person
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create a person</DialogTitle>
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
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="add a person" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="submit"
                                variant={"success"}
                                className="text-primary"
                            >
                                Add
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}