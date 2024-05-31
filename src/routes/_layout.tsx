import ThemeToggle from '@/components/ThemeToggle'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { RiGithubFill } from 'react-icons/ri'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent
})

function LayoutComponent() {
  return (
    <main className="grid h-dvh grid-rows-[auto_1fr_auto] gap-2">
      <nav className='border-b border-accent p-4'>
        <ThemeToggle />
      </nav>
      <Outlet />
      <footer className="relative flex items-center justify-center gap-2 border-t border-accent p-4 text-primary backdrop-blur-md">
        <p>
          MIT Licensed @ 2024
        </p>
        <p>&#8226;</p>
        <a className="text-secondary" target='_blank' href="https://github.com/mouktardev/tinybase-crud-starter">
          <RiGithubFill className="size-6" />
        </a>
      </footer>
    </main>
  )
}