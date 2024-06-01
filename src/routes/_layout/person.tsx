import { DeleteAll } from "@/components/DeleteAll"
import { PersonCreate } from "@/components/PersonCreate"
import { PersonRead } from "@/components/PersonRead"
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/person')({
  component: PersonLayout
})

function PersonLayout() {
  return (
    <div className='mx-auto w-full space-y-5 rounded-lg border border-accent p-5 md:w-[700px]'>
      <div className="flex gap-3">
        <PersonCreate />
        <DeleteAll />
      </div>
      <div className="grid gap-2 md:grid-cols-[auto_1fr]">
        <PersonRead />
        <Outlet />
      </div>
    </div>
  )
}
