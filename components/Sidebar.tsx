"use client";

import { THeaderProps } from "@/interface";
import { groupBy } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ docs }: THeaderProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const rawSlug = segments[segments.length - 1];

  const slug = decodeURIComponent(rawSlug);

  // filter docs if authors, categories, or tags is present in the url segments
  let filteredDocs = docs;
  if (segments.includes("authors")) {
    filteredDocs = docs.filter((doc) => doc.author === slug);
  } else if (segments.includes("categories")) {
    filteredDocs = docs.filter((doc) => doc.category === slug);
  } else if (segments.includes("tags")) {
    filteredDocs = docs.filter((doc) => doc.tags.includes(slug));
  }

  // filter out root and non-root documents
  const roots = filteredDocs.filter((doc) => doc.parent === null);
  const nonRoots = groupBy(
    filteredDocs.filter((doc) => doc.parent !== null),
    (doc) => doc.parent!,
  );

  // if any non root document's parent is not present in the roots. then find it's parent and push to roots array
  Object.keys(nonRoots).forEach((parentId) => {
    const parentFoundInRoots = roots.find((root) => root.id === parentId);
    if (!parentFoundInRoots) {
      const parentDoc = docs.find((doc) => doc.id === parentId);
      if (parentDoc) {
        roots.push(parentDoc);
      }
    }
  });

  // helper function to get the class name for a link based on whether it is active or not
  const getLinkClassName = (
    href: string,
    activeClass: string,
    inactiveClass: string,
  ) =>
    [
      "flex justify-between gap-2 py-1 pr-3 text-sm transition",
      href === pathname ? activeClass : inactiveClass,
    ].join(" ");

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {roots.map((rootNode) => {
          const rootHref = `/docs/${rootNode.id}`;
          const rootIsActive =
            pathname === rootHref || pathname.startsWith(`${rootHref}/`);

          return (
            <li key={rootNode.id} className="relative">
              <Link
                aria-current={pathname === rootHref ? "page" : undefined}
                className={[
                  "flex justify-between gap-2 py-1 pl-4 pr-3 text-sm transition",
                  rootIsActive
                    ? "font-semibold text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-900 hover:text-emerald-600 dark:text-white dark:hover:text-emerald-400",
                ].join(" ")}
                href={rootHref}
              >
                <span className="truncate">{rootNode.title}</span>
              </Link>

              {nonRoots[rootNode.id] && (
                <ul role="list">
                  {nonRoots[rootNode.id].map((childNode) => {
                    const href = `/docs/${rootNode.id}/${childNode.id}`;
                    const isActive = pathname === href;

                    return (
                      <li key={childNode.id}>
                        <Link
                          aria-current={isActive ? "page" : undefined}
                          className={getLinkClassName(
                            href,
                            "pl-7 font-medium text-emerald-600 dark:text-emerald-400",
                            "pl-7 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white",
                          )}
                          href={href}
                        >
                          <span className="truncate">{childNode.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
