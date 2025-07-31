import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "@tanstack/react-router";

const columnHelper = createColumnHelper<any>();

export const charcterColumns = [
  columnHelper.accessor("id", {
    header: () => <span>ID</span>,
    cell: (info) => info.getValue(),
    footer: () => "ID",
  }),
  columnHelper.accessor("name", {
    header: () => <span>Name</span>,
    cell: (info) => (
      <Link to="/characters/$id" params={{ id: info.row.original.id }}>
        {info.getValue()}
      </Link>
    ),
    footer: () => "Name",
  }),
  columnHelper.accessor("status", {
    header: () => <span>Status</span>,
    cell: (info) => info.getValue(),
    footer: () => "Status",
  }),
  columnHelper.accessor("species", {
    header: () => <span>Species</span>,
    cell: (info) => info.getValue(),
    footer: () => "Species",
  }),
  columnHelper.accessor("gender", {
    header: () => <span>Gender</span>,
    cell: (info) => info.getValue(),
    footer: () => "Gender",
  }),
];
