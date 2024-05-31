import * as UiReact from "tinybase/debug/ui-react/with-schemas";

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
	notes:{
		0:{
			date: "1/12/2024",
			note: "Mouktar first note",
			status: true,
			personId: 0,	
		},
		1:{
			date: "1/10/2024",
			note: "John note",
			status: true,
			personId: 1,	
		},
		2:{
			date: "1/7/2024",
			note: "Mouktar second note",
			status: false,
			personId: 0,	
		},
		3:{
			date: "7/7/2024",
			note: "and the tslint extension installed in Vcode, this worked for me, but after enabling I notice an increase amount of CPU usage, specially on big projects.",
			status: true,
			personId: 0,	
		}
	},
	person:{
		0:{name:"Mouktar"},
		1:{name:"John"}
	}
};

const UiReactWithSchemas = UiReact as UiReact.WithSchemas<
	[typeof TablesSchema, typeof ValuesSchema]
>;

export const {
	Provider,
	useCreateIndexes,
	useCreateRelationships,
	useCreatePersister,
	useCreateQueries,
	useCreateStore,
	CellProps,
	RowProps,
	RowView,
	useAddRowCallback,
	useCell,
	useValue,
	useHasValue,
	useHasRow,
	useDelRowCallback,
	useRowIds,
	useSetPartialRowCallback,
	useSetPartialValuesCallback,
	useQueries,
	useResultCell,
	useResultSortedRowIds,
	useResultTableCellIds,
	useSetCellCallback,
	useSliceIds,
	useSliceRowIds,
	useStore,
	useLocalRowIds,
	CellView,
	RemoteRowView,
	LinkedRowsView,
	LocalRowsView,
	ResultCellProps,
	ResultCellView,
	ResultRowView,
} = UiReactWithSchemas;