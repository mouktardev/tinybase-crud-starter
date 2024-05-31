# Tinybase CRUD starter

### Vite + React-ts + TypeScript + tailwindcss + tanStack router + tinybase + Shadcn/ui

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

## User interface

This starter is using [shadcn/ui](https://ui.shadcn.com/) which is built on [radix-ui](https://www.radix-ui.com/primitives/docs/overview/introduction) primitives but with a little bit of changes to match the color variables in `style.css`.

## Theming

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
