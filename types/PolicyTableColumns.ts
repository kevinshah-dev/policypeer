"use client";

import { ColumnDef } from "@tanstack/react-table";

export const PolicyTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "policyType",
    header: "Policy Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "premium",
    header: "Premium",
  },
  {
    accessorKey: "coverage_amount",
    header: "Coverage Amount",
  },
];
