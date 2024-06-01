import { InitialTableData, InitialValueData, Provider, TablesSchema, ValuesSchema, useCreateIndexes, useCreatePersister, useCreateRelationships, useCreateStore } from "@/schema";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { LuAlertCircle } from "react-icons/lu";
import { createIndexedDbPersister } from "tinybase/persisters/persister-indexed-db/with-schemas";
import { createIndexes, createRelationships, createStore } from "tinybase/with-schemas";
import { routeTree } from "./routeTree.gen";
import "./styles.css";

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: {
    store: undefined!
  },
  defaultNotFoundComponent: () => {
    return (
      <div className="flex h-dvh w-dvw items-center justify-center gap-3 p-5">
        <LuAlertCircle className="size-6 text-secondary" />
        <p className="text-2xl font-bold leading-none text-primary">This page doesn't exist!</p>
      </div>
    )
  },
});

// Register for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const store = useCreateStore(() => createStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema));
  useCreatePersister(
    store,
    (store) => {
      return createIndexedDbPersister(store, "store");
    },
    [],
    async (persister) => {
      await persister?.startAutoLoad(InitialTableData, InitialValueData);
      await persister?.startAutoSave();
    }
  );

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
      <RouterProvider router={router} context={{ store }} />
    </Provider>
  )
}

const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(<App />)
}
