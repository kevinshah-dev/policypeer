"use client";

import { ColumnDef } from "@tanstack/react-table";

export const ClaimTableColumns: ColumnDef<any>[] = [
  {
    accessorKey: "claim_category",
    header: "Claim Category",
  },
  {
    accessorKey: "claimDate",
    header: "Claim Date",
  },
  {
    accessorKey: "claimStatus",
    header: "Claim Status",
  },
  {
    accessorKey: "claimAmount",
    header: "Claim Amount",
  },
  {
    accessorKey: "claimNumber",
    header: "Claim Number",
  },
  {
    accessorKey: "claimDescription",
    header: "Claim Description",
  },
];
