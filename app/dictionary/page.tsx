"use client";

import { useState, useCallback, startTransition } from "react";
import { NavBar } from "@/components/navbar";
import { navLinks } from "@/lib/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { montserrat } from "@/lib/fonts/fonts";
import { DICTIONARY_DATA } from "@/lib/dictionarydata";
import { DictionaryEntry } from "@/lib/dictionarydata";
import { useRouter } from "next/navigation";

function getRandomEntry(
  entries: DictionaryEntry[]
): DictionaryEntry | undefined {
  if (!entries.length) return undefined;
  const idx = Math.floor(Math.random() * entries.length);
  return entries[idx];
}

export default function InsuranceDictionary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEntries, setFilteredEntries] = useState<DictionaryEntry[]>([]);
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setFilteredEntries([]);
    } else {
      const results = DICTIONARY_DATA.filter((entry) =>
        entry.term.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredEntries(results);
    }
  };

  const handleLuckyClick = useCallback(() => {
    const random = getRandomEntry(DICTIONARY_DATA);
    if (!random) return; // edge-case: no data

    startTransition(() => {
      router.push(`/dictionary/${random.slug}`);
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar logoText="PolicyPeer" navLinks={navLinks} signInHref="/login" />

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-4 ${montserrat.className}`}>
            Insurance Dictionary
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Understand insurance terms to make informed decisions.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for a term..."
              className="pl-10 h-12"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              variant="secondary"
              className="font-semibold"
              onClick={handleLuckyClick}
              aria-label="Jump to a random dictionary entry"
            >
              I&apos;m Feeling Lucky
            </Button>
          </div>
        </div>

        {filteredEntries.length > 0 ? (
          <div className="space-y-6">
            {filteredEntries.map((entry) => (
              <Card key={entry.slug} className="p-6 shadow-md rounded-lg">
                <CardContent>
                  <h2 className="text-2xl font-semibold mb-2">{entry.term}</h2>
                  <p className="text-md text-gray-700">{entry.definition}</p>
                  {entry.category && (
                    <Badge variant="secondary" className="mt-4">
                      {entry.category}
                    </Badge>
                  )}
                  {/* Learn More Button */}
                  <div className="mt-4">
                    <Link href={`/dictionary/${entry.slug}`}>
                      <Button variant="secondary" className="font-semibold">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          searchTerm && (
            <div className="text-center text-gray-500 mt-8">
              <p>
                No definitions found for "
                <span className="font-semibold">{searchTerm}</span>".
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}
