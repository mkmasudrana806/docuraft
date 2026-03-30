import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TDocumentMeta } from "@/interface";



const docsDirectory = path.join(process.cwd(), "docs");

// get Documents
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
