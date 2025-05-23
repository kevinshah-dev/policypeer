"use client";

import { MDXRemote } from "next-mdx-remote";

export default function MDXRemoteClient({ source }: { source: any }) {
  return <MDXRemote {...source} />;
}
