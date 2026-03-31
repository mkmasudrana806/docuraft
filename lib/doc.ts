import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TDocumentMeta } from "@/interface";
import { remark } from "remark";
import remarkHtml from "remark-html";

const docsDirectory = path.join(process.cwd(), "docs");

/**
 * --------- get all documents metadata ----------
 * @returns document id and metadata
 */
export function getDocuments() {
  const fileNames = fs.readdirSync(docsDirectory);

  const allDocuments = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");
    const filePath = path.join(docsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    // parsing with gray-matter to make 'data' and 'content' available
    const matterResult = matter(fileContents); // return object
    return {
      id,
      ...matterResult.data,
    } as TDocumentMeta;
  });

  return allDocuments.sort((a, b) => a.order - b.order);
}

/**
 * ----------- get document by id -----------
 * @param id document id
 * @returns processed document, metadata and id
 */
export const getDocumentContentById = async (id: string) => {
  const fullPath = path.join(docsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const matterResult = matter(fileContents);
  const processContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processContent.toString();

  return {
    id,
    ...matterResult.data,
    contentHtml,
  } as TDocumentMeta & { id: string; contentHtml: string };
};
