import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "../../../components/ui/button.js";
import { Checkbox } from "../../../components/ui/checkbox.js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu.js";
import { MoreHorizontal } from "lucide-react";

import type { Page } from "../../../services/page.ts";

interface PageColumnProps {
  onEdit: (page: Page) => void;
  onDelete: (id: string) => void;
}

export const createPageColumns = ({
  onEdit,
  onDelete,
}: PageColumnProps): ColumnDef<Page>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <img src={row.original.image} alt={row.original.title} width={50} height={50} />
    )
  },


  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
  },

  {
    accessorKey: "content",
    header: "content",
    cell: ({ row }) => (
      <div
        className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
        dangerouslySetInnerHTML={{ __html: row.original.content }}
        title={row.original.content.replace(/(<([^>]+)>)/gi, "")}
      />
    ),
  },

  {
    accessorFn: (row) => row.isActive,
    id: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.original.isActive === true;
      const statusText = isActive ? "Active" : "Inactive";
      const statusClass = isActive
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800";

      return (
        <span
          className={`py-1 px-3 rounded-full text-xs font-medium ${statusClass}`}
        >
          {statusText}
        </span>
      );
    },
    enableSorting: true,
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const Page = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onEdit(Page)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(Page._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];