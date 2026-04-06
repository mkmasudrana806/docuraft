import { TDocumentMeta } from "@/interface";
import Link from "next/link";
import React from "react";

const SearchResults = ({
  results,
  term,
  closeSearchResults
}: {
  results: TDocumentMeta[];
  term: string;
  closeSearchResults: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  
  return (
    <div className="absolute left-0 top-12 z-[999] w-full rounded-md bg-white p-4 shadow">
      <p className="text-lg!">
        Showing results for
        <span className="font-semibold">: {term}</span>
      </p>
      <ul role="list" className="divide-y divide-gray-100 [&>*]:py-2">
        {results.map((result) => (
          <li key={result.id} className="">
            <Link
            onClick={(e) => closeSearchResults(e)}
              className="transition-all hover:text-emerald-600"
              href={`/docs/${result.id}`}
            >
              {result.title}
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
