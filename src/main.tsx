import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { LuAlertCircle } from "react-icons/lu";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center gap-3 p-5">
        <LuAlertCircle className="size-6 text-secondary" />
        <p className="text-2xl font-bold leading-none text-primary">This page doesn't exist!</p>
      </div>
    )
  },
  // defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<RouterProvider router={router} />);
}
