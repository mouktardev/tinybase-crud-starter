import { Toaster } from "@/components/ui/Toaster";
import { TablesSchema, ValuesSchema } from "@/schema";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
// import { StoreInspector } from "tinybase/ui-react-dom";
import { Store } from "tinybase/with-schemas";

interface MyRouterContext {
    store: Store<[typeof TablesSchema, typeof ValuesSchema]> | undefined
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootComponent,
});

function RootComponent() {
    return (
        <>
            <Outlet />
            <Toaster richColors closeButton />
            {/* <StoreInspector /> */}
        </>
    )
}