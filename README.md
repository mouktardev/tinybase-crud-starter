# Opinionated CRUD Tinybase Starter

This CRUD starter use `indexedDB` to persist your changes to build local first apps and combines the best tools for building modern web applications:

- [TinyBase](https://tinybase.org/) with React for data storing and more.
- [Vite](https://vitejs.dev/) for lightning-fast development
- [TanStack](https://tanstack.com/router/latest) powerful routing system with vite plugin to auto generate routes
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful, customizable UI components found in `components/ui`

## introduction

There is two tables `person` and `notes` with one to many relationship you can create, delete or edit unique people and the same with their notes simple right. There is also values in this starter like `isThemeDark` you can toggle it directly.

## TinyBase Store and persister

From [TinyBase](https://tinybase.org/) we are using `store`, `indexes` and `relationships` each with their hooks and components for example in `main.ts`:

- Here we initialize `store` and persist changes in `indexedDb`, now we can use `store` hooks and components to mutate and display data.

```js
const store = useCreateStore(() =>
  createStore().setTablesSchema(TablesSchema).setValuesSchema(ValuesSchema)
);
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
```

- Here we initialize `indexes` so we can use its hooks to check
  whether a `person` exist by returning an array of `name` cell value of all `person` table.

```js
const indexes = useCreateIndexes(store, (store) =>
  createIndexes(store).setIndexDefinition("by_person", "person", "name")
);
```

```js
const persons = useSliceIds("by_person");
```

- Lastly we initialize `relationships` between `person` and `notes` table to use a hook to retrieve all notes based on a `personId` then use components to display it.

```js
const relationships = useCreateRelationships(store, (store) => {
  return createRelationships(store).setRelationshipDefinition(
    "person_notes",
    "notes",
    "person",
    "personId"
  );
});
```

```js
const personIdsLinkedToNotes = useLocalRowIds("person_notes", props.rowId);
```

```js
const personIdsLinkedToNotes = useLocalRowIds("person_notes", props.rowId);
```

### Schema-Based Typing wit tinybase

When using tinybase modules you can benefit from autocomplete and type constraints based on your `TablesSchema` and `ValuesSchema` here is how in `schema.ts`:

- create schema:

```ts
export const TablesSchema = {
  person: {
    name: { type: "string" },
  },
  notes: {
    date: { type: "string" },
    note: { type: "string" },
    personId: { type: "number" },
  },
} as const;

export const ValuesSchema = {
  isThemeDark: { type: "boolean" },
} as const;
```

- You can initial the values for them if you like, for example here we initialized `isThemeDark` using theme local storage value:

```ts
export const InitialValueData = {
  isThemeDark: localStorage.getItem("theme") === "dark",
};
```

- Lastly we can use our scheme and export `Tinybase` modules to use in our app, since they are schema typed you will get error if for example a tabelId or a cellId are not matched and more.

```ts
import * as UiReact from "tinybase/ui-react/with-schemas";

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

export const {
  Provider,
  useCreateStore,
  useCreateIndexes,
  useCreateRelationships,
  useValues,
  useValue,
  useSetPartialValuesCallback,
  CellProps,
  CellView,
  RowView,
  useRowIds,
  useAddRowCallback,
  useSliceIds,
  useCell,
  useSetPartialRowCallback,
  LocalRowsView,
  RowProps,
  useLocalRowIds,
  useDelRowCallback,
} = UiReactWithSchemas;
```

## TanStack router:

Using typed router context in [TanStack](https://tanstack.com/router/latest) we can pass `store` so we can utilize `loaders` and check if data is in in the database using `url params` otherwise throw a `NotFound` that render's `notFoundComponent`, for example in `person.$person.tsx`

```js
export const Route = createFileRoute("/_layout/person/$person")({
  loader: ({ params: { person }, context: { store } }) => {
    if (!store?.hasRow("person", person)) {
      throw notFound();
    }
  },
  notFoundComponent: () => {
    return (
      <div className="flex items-center justify-center gap-3 border border-warning bg-warningForeground p-2">
        <LuAlertCircle className="size-4 text-warning" />
        <p className="font-bold leading-none text-warning">
          This person doesn't exist!
        </p>
      </div>
    );
  },
  component: Person,
});
```

## Theming

This starter is using [shadcn/ui](https://ui.shadcn.com/) which is built on [radix-ui](https://www.radix-ui.com/primitives/docs/overview/introduction) primitives and more but with a little bit of changes to match the color variables in `style.css`.

- In `style.css` you can change colors value for light and dark mode here:

```css
:root {
  --background: 250 250 250;
  --foreground: 244 244 245;
  --primary: 52 51 56;
  --secondary: 145 144 161;
  --accent: 219 219 226;
  --mute: 166 166 180;
  --warning: 202 138 4;
  --warning-foreground: 255 204 0;
  --danger: 239 68 68;
  --danger-foreground: 252 165 165;
  --success: 16 185 129;
  --success-foreground: 110 231 183;
  --action: 125 211 252;
}

.dark {
  --background: 10 10 10;
  --foreground: 23 23 23;
  --primary: 229 231 235;
  --secondary: 115 115 115;
  --accent: 38 38 38;
  --mute: 64 64 64;
  --warning: 202 138 4;
  --warning-foreground: 113 63 18;
  --danger: 252 165 165;
  --danger-foreground: 69 10 10;
  --success: 110 231 183;
  --success-foreground: 2 44 34;
  --action: 3 105 161;
}
```

- If you choose to add a new color variable make sure to add it in `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      YourColor: "rgb(var(--YourColor) / <alpha-value>)",
        }
      }
  }
```
