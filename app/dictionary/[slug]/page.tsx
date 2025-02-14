// app/dictionary/[slug]/page.tsx
export const runtime = "nodejs";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { ArrowLeft } from "lucide-react";
import { DICTIONARY_DATA } from "@/lib/dictionarydata";
import path from "path";
import fs from "fs";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import MDXRemoteClient from "@/components/MDXRemoteClient";

const getDictionaryFilePath = (slug: string) =>
  path.join(process.cwd(), "content", `${slug}.mdx`);

export default async function DictionaryEntryPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const filePath = getDictionaryFilePath(slug);

  if (!fs.existsSync(filePath)) {
    console.log("File not found", filePath);
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const mdxSource = await serialize(source);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link
            href="/dictionary"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Dictionary
          </Link>
        </div>
        <article className="prose lg:prose-xl">
          <MDXRemoteClient source={mdxSource} />
        </article>
      </main>
    </div>
  );
}
