import { PersonCreate } from "@/components/PersonCreate"
import { PersonRead } from "@/components/PersonRead"
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/person')({
  component: PersonLayout
})

function PersonLayout() {
  return (
    <div className='mx-auto max-w-[700px] space-y-5 rounded-lg border border-accent p-5'>
      <PersonCreate />
      <div className="grid gap-2 md:grid-cols-[auto_1fr]">
        <PersonRead />
        <Outlet />
      </div>
    </div>
  )
}
