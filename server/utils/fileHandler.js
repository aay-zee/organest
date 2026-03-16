import fs, { readFileSync } from "fs";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

async function extractTextFromFile(filePath) {
  const fileExtension = filePath.split(".").pop().toLowerCase();

  if (fileExtension === "pdf") {
    const buffer = readFileSync(filePath);
    const result = await pdfParse(buffer);
    return result.text;
  }

  if (fileExtension === "docx") {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value || "";
  }

  if (fileExtension === "txt") {
    return fs.promises.readFile(filePath, "utf8");
  }

  throw new Error("Unsupported file type");
}

export { extractTextFromFile };
