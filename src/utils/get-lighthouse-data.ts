import fs from "fs";
import path from "path";

export async function getLighthouseData() {
  const filePath = path.join(process.cwd(), "lighthouse-report.json");
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData.toString());
}
