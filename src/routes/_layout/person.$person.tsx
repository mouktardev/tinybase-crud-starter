import { NoteCreate } from '@/components/NoteCreate';
import NoteRead from '@/components/NoteRead';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/person/$person')({
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

