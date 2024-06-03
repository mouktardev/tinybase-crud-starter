import { CellProps, CellView, LocalRowsView, RowProps, RowView, useCell, useLocalRowIds } from "@/schema";
import { LuCheckCircle2, LuCircleEllipsis, LuMoreHorizontal } from "react-icons/lu";
import { NoteDelete } from "./NoteDelete";
import { NoteUpdate } from "./NoteUpdate";
import { Button } from "./ui/Button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";

export default function NoteRead({ personId }: { personId: string }) {
  return (
    <RowView
      tableId={"person"}
      rowId={personId}
      cellComponent={CustomCellPersonNotes}
    />
  )
}

const CustomCellPersonNotes = (props: typeof CellProps) => {
  const personIdsLinkedToNotes = useLocalRowIds("person_notes", props.rowId)
  return (
    <>
      {personIdsLinkedToNotes.length > 0 && (
        <div className="relative overflow-hidden rounded-lg border border-accent">
          <Table className="max-w-[dvw] md:max-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>status</TableHead>
                <TableHead>action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <LocalRowsView
                relationshipId="person_notes"
                remoteRowId={props.rowId}
                rowComponent={CustomRowNotes}
              />
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}

const CustomRowNotes = (props: typeof RowProps) => {
  return (
    <TableRow>
      <RowView cellComponent={CustomCellNotes} {...props} />
    </TableRow>
  )
}

const CustomCellNotes = (props: typeof CellProps) => {
  const status = useCell("notes", props.rowId, "status")
  return props.cellId === "status" ? (
    <TableCell>
      <div className="flex items-center justify-center">
        {status ? <LuCheckCircle2 className="size-4 text-success" /> : <LuCircleEllipsis className="size-4 text-warning" />}
      </div>
    </TableCell>
  ) : props.cellId !== "personId" ? (
    <TableCell>
      <CellView {...props} />
    </TableCell>
  ) : (
    <TableCell>
      <Popover>
        <PopoverTrigger asChild>
          <Button type="button" variant={"outline"}>
            <LuMoreHorizontal className="size-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-1 p-1" align="end">
          <NoteUpdate {...props} />
          <NoteDelete {...props} />
        </PopoverContent>
      </Popover>
    </TableCell>
  )
}