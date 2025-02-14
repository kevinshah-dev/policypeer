"use client";
import { Suspense } from "react";
import AddReview from "./addreviewcomponent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddReview />
    </Suspense>
  );
}
