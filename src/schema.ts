import * as UiReact from "tinybase/ui-react/with-schemas";

export const TablesSchema = {
	person: {
        name:{type:"string"},
    },
	notes: {
        date: { type: "string" },
        note: { type: "string" },
        status: { type: "boolean" },
        personId: { type: "number" },
    },
} as const;

export const ValuesSchema = {
	isThemeDark: { type: "boolean" },
} as const;

export const InitialValueData = {
	isThemeDark: localStorage.getItem("theme") === "dark",
};

export const InitialTableData = {
	person:{
		0:{name:"Lisa"},
	},
	notes:{
		0:{
			date: "2024/12/1",
			note: "Example note",
			status: true,
			personId: 0,	
		},
	}
};

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
	[typeof TablesSchema, typeof ValuesSchema]
>;

export const {
	Provider,
	useCreatePersister,
	useCreateStore, 
	useCreateIndexes, 
	useCreateRelationships, 
	useValues,
	useValue,
	useSetPartialValuesCallback,
	CellProps,
	CellView,
	RowView,
	useHasRow,
	useRowIds,
	useAddRowCallback,
	useSliceIds,
	useCell,
	useSetPartialRowCallback,
	LocalRowsView,
	RowProps,
	useLocalRowIds,
	useDelRowCallback
} = UiReactWithSchemas;