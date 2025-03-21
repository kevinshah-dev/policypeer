"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button variant="secondary" onClick={() => router.back()}>
      Back to Claims
    </Button>
  );
}
