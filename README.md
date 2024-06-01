# Opinionated CRUD Tinybase Starter

personal starter i use to build local first apps combines the best tools for building modern, high-performance web applications:

- [TinyBase](https://tinybase.org/) with React for data storing and more.
- [Vite](https://vitejs.dev/) for lightning-fast development
- [TanStack](https://tanstack.com/router/latest) powerful routing system with vite plugin to auto generate routes
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful, customizable UI components found in `components/ui`

## Store scheme

There is two tables `person` and `notes` with one to many relationship you can add, edit and delete them. There is also values in this starter like `isThemeDark` you can toggle it directly.

inside `schema.ts` you will find Tables and Values schema:

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

and you can initial the values for them if you like, for example here we initialized `isThemeDark` using theme local storage value:

```ts
export const InitialValueData = {
  isThemeDark: localStorage.getItem("theme") === "dark",
};
```

#### Note

also you cannot add or rename to an existing `person` using this relationship hook.

```js
const personIdsLinkedToNotes = useLocalRowIds("person_notes", props.rowId);
```

### Schema-Based Typing wit tinybase

when using tinybase modules you can benefit from autocomplete and type constraints based on your TablesSchema and ValuesSchema here is how in `schema.ts`:

```ts
import * as UiReact from "tinybase/ui-react/with-schemas";

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
  [typeof TablesSchema, typeof ValuesSchema]
>;

//here you all ui-react export are schema typed so you will get error if for example tabelId or cellId are not matched and more
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

Using typed router context in [TanStack](https://tanstack.com/router/latest) we can pass tinybase store so we can utilize loaders and check if data is in in the database using the url param otherwise throw a `NotFound` and render that component here an example `person.$person`

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

function Person() {
  const { person } = Route.useParams();
  return (
    <div className="space-y-3">
      <NoteCreate personId={person} />
      <NoteRead personId={person} />
    </div>
  );
}
```

## Theming

This starter is using [shadcn/ui](https://ui.shadcn.com/) which is built on [radix-ui](https://www.radix-ui.com/primitives/docs/overview/introduction) primitives but with a little bit of changes to match the color variables in `style.css`.

in `style.css` you can change colors value for light and dark mode here:

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

if you choose to add a new variable make sure to add it in `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      YourColor: "rgb(var(--YourColor) / <alpha-value>)",
        }
      }
  }
```
