import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute("/_layout/")({
  beforeLoad: (p) => {
    if (p.location.pathname === "/") {
      throw redirect({ to: "/person", })
    }
  },
});