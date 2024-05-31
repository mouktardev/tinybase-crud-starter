import { cn } from '@/lib/utils';
import { CellProps, RowView, useCell, useRowIds, useSetPartialRowCallback } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from "date-fns";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuChevronDown, LuPenLine } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from './ui/Button';
import { Calendar } from './ui/Calendar';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/Form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/Popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/Select';
import { Switch } from './ui/Switch';
import { Textarea } from './ui/Textarea';

const NoteFormSchema = z.object({
    date: z.date({ required_error: "a date is required." }),
    note: z.string().min(2, { message: "must contain at least 2 character(s)" }),
    status: z.boolean(),
    personId: z.number(),
});

export const NoteUpdate = (props: typeof CellProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const personRowIds = useRowIds("person")
    const form = useForm<z.infer<typeof NoteFormSchema>>({
        resolver: zodResolver(NoteFormSchema),
        defaultValues: {
            date: new Date(useCell("notes", props.rowId, 'date') as string),
            note: useCell("notes", props.rowId, "note") as string,
            status: useCell("notes", props.rowId, "status"),
            personId: useCell("notes", props.rowId, "personId") as number,
        },
    });
    const setRow = useSetPartialRowCallback(
        "notes",
        props.rowId,
        (e: z.infer<typeof NoteFormSchema>) => ({
            date: format(e.date, "yyyy-MM-dd"),
            note: e.note,
            status: e.status,
            personId: e.personId
        }),
        [],
        undefined,
        (store, partialRow) => {
            const name = store.getCell('person', `${partialRow.personId}`, 'name')
            toast.success(`a note is Edited inside: ${name}`);
        }
    );

    function onSubmit(values: z.infer<typeof NoteFormSchema>) {
        setRow(values)
        setOpen(false)
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
                    <DialogTitle>Edit Note</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="note"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Summary</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="write a summary" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="space-x-2">
                                    <FormLabel>
                                        Date
                                    </FormLabel>
                                    <Popover>
                                        <FormControl>
                                            <PopoverTrigger asChild>
                                                <Button type="button" variant={"outline"}>
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span className="text-sm text-secondary">
                                                            Pick a date
                                                        </span>
                                                    )}
                                                    <LuChevronDown className="ml-2 size-4" />
                                                </Button>
                                            </PopoverTrigger>
                                        </FormControl>
                                        <PopoverContent className="w-auto p-0" align="center">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <div className="inline-flex items-center space-x-2">
                                            <Switch
                                                className={cn(field.value ? "data-[state=checked]:bg-successForeground" : "data-[state=unchecked]:bg-warningForeground")}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            {field.value ?
                                                <span className="text-success">
                                                    Finished
                                                </span>
                                                :
                                                <span className="text-warning">
                                                    Unfinished
                                                </span>
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="personId"
                            render={({ field }) => (
                                <FormItem className="space-x-2">
                                    <FormLabel>person</FormLabel>
                                    <Select
                                        name={field.name}
                                        onValueChange={(value) => field.onChange(parseInt(value))}
                                        value={`${field.value}`}
                                        defaultValue={`${field.value}`}
                                    >
                                        <FormControl>
                                            <SelectTrigger asChild>
                                                <Button type="button" variant={"outline"}>
                                                    <SelectValue />
                                                    <LuChevronDown className="ml-2 size-4" />
                                                </Button>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent align="center">
                                            <SelectGroup>
                                                <SelectLabel>Type</SelectLabel>
                                                {personRowIds.map((rowId) => (
                                                    <SelectItem key={rowId} value={rowId}>
                                                        <RowView
                                                            tableId={"person"}
                                                            rowId={rowId}
                                                        />
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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
                                    cancel
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                variant={"success"}
                                className="text-primary"
                            >
                                Edit Note
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}