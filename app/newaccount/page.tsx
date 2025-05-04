// app/account/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import { ClaimTableColumns } from "@/types/ClaimTableColumns";
import { PolicyTableColumns } from "@/types/PolicyTableColumns";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";

export default function Account() {
  const router = useRouter();
  const [claims, setClaims] = useState<any[]>([]);
  const [policies, setPols] = useState<any[]>([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) return router.replace("/login");
      (async () => {
        const uid = data.session.user.id;
        const [{ data: c }, { data: p }, { data: u }] = await Promise.all([
          supabase.from("claims").select("*").eq("user_id", uid),
          supabase.from("policies").select("*").eq("user_id", uid),
          supabase
            .from("userdemo")
            .select("*")
            .eq("user_id", uid)
            .order("created_at", { ascending: false })
            .limit(1),
        ]);
        setClaims(c ?? []);
        setPols(p ?? []);
        setProfile(u?.[0] ?? null);
        setLoading(false);
      })();
    });
  }, [router]);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
      <main className="flex-1 p-6 lg:p-10 space-y-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          Account overview
        </h1>

        <Tabs defaultValue="claims" className="space-y-6">
          <TabsList>
            <TabsTrigger value="claims">Claims</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Claims */}
          <TabsContent value="claims">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Your Claims</CardTitle>
                <Button asChild size="sm" variant="outline">
                  <Link href="/addclaim">New claim</Link>
                </Button>
              </CardHeader>

              <CardContent>
                {loading ? (
                  <Skeleton className="h-40 w-full rounded-lg" />
                ) : (
                  <DataTable columns={ClaimTableColumns} data={claims} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies */}
          <TabsContent value="policies">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Your Policies</CardTitle>
                <Button asChild size="sm" variant="outline">
                  <Link href="/addpolicytype">Add policy</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <Skeleton className="h-40 w-full rounded-lg" />
                ) : (
                  <DataTable columns={PolicyTableColumns} data={policies} />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Demographic info</CardTitle>
              </CardHeader>
              <CardContent>
                {/* render your existing form here, maybe inside a Sheet */}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
