"use client";
import { TDocumentMeta, THeaderProps } from "@/interface";
import Image from "next/image";
import React, { useState } from "react";
import SearchResults from "./SearchResults";
import useDebounce from "@/hooks/useDebounce";
import { useRouter } from "next/navigation";

const Search = ({ docs }: THeaderProps) => {
  const [searchResult, setSearchResult] = useState<TDocumentMeta[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  // search on change
  const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.trim().toLowerCase();
    setSearchTerm(search);
    doSearch(search);
  };

  // const do searchh
  const doSearch = useDebounce((search: string) => {
    if (search === "") {
      setSearchResult([]);
      return;
    }
    const results = docs.filter((doc) =>
      doc.title.toLowerCase().includes(search),
    );
    console.log(results);
    setSearchResult(results);
  }, 500);

  // close search results on click
  // close search result on click
  const closeSearchResults = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(e.currentTarget.href);
    setSearchTerm("");
  };

  return (
    <div className="relative hidden lg:block lg:max-w-md lg:flex-auto">
      <button
        type="button"
        className="focus:[&amp;:not(:focus-visible)]:outline-none hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex"
      >
        <Image
          src="/search.svg"
          alt="Search in Docuraft"
          height={50}
          width={50}
          className="h-5 w-5"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={searchOnChange}
          placeholder="Search..."
          className="flex-1 focus:border-none focus:outline-none"
        />
        <kbd className="ml-auto w-auto text-2xs text-zinc-400 dark:text-zinc-500">
          <kbd className="font-sans">Ctrl </kbd>
          <kbd className="font-sans">K</kbd>
        </kbd>
      </button>
      {/* <!-- result card --> */}
      {searchTerm && searchTerm.trim().length > 0 && (
        <SearchResults
          results={searchResult}
          term={searchTerm}
          closeSearchResults={closeSearchResults}
        />
      )}
    </div>
  );
};

export default Search;
