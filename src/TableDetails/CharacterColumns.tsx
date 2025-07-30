
interface CharacterColumn {
    header: Function,
    accessorKey: string,
    footer: string
}


export const charcterColumns: CharacterColumn[] = [{
    header: () => <span>ID</span>,
    accessorKey: "id",
    footer: "ID"
}, {
    header: () => <span>Name</span>,
    accessorKey: "name",
    footer: "Name"
}, {
    header: () => <span>Status</span>,
    accessorKey: "status",
    footer: "Status"
}, {
    header: () => <span>Species</span>,
    accessorKey: "species",
    footer: "Species"
}, {
    header: () => <span>Gender</span>,
    accessorKey: "gender",
    footer: "Gender"
}]