import { Toaster } from "@/components/ui/Toaster";
import { InitialTableData, InitialValueData, Provider, TablesSchema, ValuesSchema, useCreateIndexes, useCreateRelationships, useCreateStore } from "@/schema";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { StoreInspector } from "tinybase/debug/ui-react-dom";
import { createIndexes, createRelationships, createStore } from "tinybase/debug/with-schemas";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const store = useCreateStore(() => createStore()
        .setTablesSchema(TablesSchema)
        .setTables(InitialTableData)
        .setValuesSchema(ValuesSchema)
        .setValues(InitialValueData));
    const indexes = useCreateIndexes(store, (store) => createIndexes(store)
        .setIndexDefinition("by_person", "person", "name"))
    const relationships = useCreateRelationships(store, (store) => {
        return createRelationships(store).setRelationshipDefinition(
            "person_notes",
            "notes",
            "person",
            "personId"
        );
    });
    return (
        <Provider store={store} indexes={indexes} relationships={relationships}>
            <Outlet />
            <StoreInspector />
            <Toaster richColors closeButton />
        </Provider>
    )
}