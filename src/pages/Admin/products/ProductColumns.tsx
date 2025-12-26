// src/components/categories/ProductColumns.tsx
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

// --- Import Shadcn Components ---
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

import type { Product } from "../../../services/product.ts";

// --- Define Action Handlers (Passed from the parent component) ---
interface ProductColumnProps {
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

// --- The Columns Definition Function ---
export const createProductColumns = ({
  onEdit,
  onDelete,
}: ProductColumnProps): ColumnDef<Product>[] => [
  // 1. Selection Column (Optional)
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
    accessorKey: "featured_image",
    header: "Image",
    cell: ({ row }) => (
      <img src={row.original.featured_image} alt={row.original.name} width={50} height={50} />
    )
  },

  // 2. Name Column (Sortable)
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },

  // 3. Description Column (Custom rendering for HTML content)
  {
    accessorKey: "category.name",
    header: "Category",
    cell: ({ row }) => (
      <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
        {row.original.category?.name || "N/A"}
      </div>
    ),
  },

  // 4. Status Column
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
    // Allows sorting by boolean value
    enableSorting: true,
  },

  // 5. Actions Column (Dropdown Menu)
  {
    id: "actions",
    cell: ({ row }) => {
      const Product = row.original;
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
            <DropdownMenuItem onClick={() => onEdit(Product)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete(Product._id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];