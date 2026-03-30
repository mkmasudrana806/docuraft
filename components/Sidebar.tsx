import { THeaderProps } from "@/interface";
import { groupBy } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Sidebar = ({ docs }: THeaderProps) => {
  // filter out root and non-root documents
  const roots = docs.filter((doc) => doc.parent === null);
  const nonRoots = groupBy(
    docs.filter((doc) => doc.parent !== null),
    (doc) => doc.parent!,
  );

  return (
    <nav className="hidden lg:mt-10 lg:block">
        <ul role="list" className="border-l border-transparent">
        {roots.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>

            {nonRoots[rootNode.id] && (
              <ul role="list" style={{ opacity: 1 } as React.CSSProperties}>
                {nonRoots[rootNode.id].map((childNode) => (
                  <li key={childNode.id}>
                    <Link
                      className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href={`/docs/${rootNode.id}/${childNode.id}`}
                    >
                      <span className="truncate">{childNode.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
