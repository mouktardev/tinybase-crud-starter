import { NoteCreate } from '@/components/NoteCreate';
import NoteRead from '@/components/NoteRead';
import { createFileRoute, notFound } from '@tanstack/react-router';
import { LuAlertCircle } from 'react-icons/lu';

export const Route = createFileRoute('/_layout/person/$person')({
  loader: ({ params: { person }, context: { store } }) => {
    if (!store?.hasRow('person', person)) {
      throw notFound()
    }
  },
  notFoundComponent: () => {
    return (
      <div className="flex items-center justify-center gap-3 border border-warning bg-warningForeground p-2">
        <LuAlertCircle className="size-4 text-warning" />
        <p className="font-bold leading-none text-warning">This person doesn't exist!</p>
      </div>)
  },
  component: Person
})

function Person() {
  const { person } = Route.useParams();
  return (
    <div className='space-y-3'>
      <NoteCreate personId={person} />
      <NoteRead personId={person} />
    </div>
  )
}

