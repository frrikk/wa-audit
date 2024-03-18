// Assuming you have renamed your script to .mjs or set "type": "module" in your package.json

import lighthouse from "lighthouse";
import fs from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { createClient } from "@supabase/supabase-js";
import AxePuppeteer, { loadPage } from "@axe-core/puppeteer";

const supabaseUrl = "https://uphvkzpmspfojxfvkxcu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwaHZrenBtc3Bmb2p4ZnZreGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzMzAyMDIsImV4cCI6MjAyNTkwNjIwMn0.StG0oFUUOKYxRp6LZWZ5fXJWXe7dDlJtLZ4CHPxwsvU"; // Use your actual Supabase key here
const supabase = createClient(supabaseUrl, supabaseKey);

async function runLighthouseAndSaveScores(url) {
  // Check if a report for this URL already exists in Supabase
  const { data: existingData, error: existingError } = await supabase
    .from("web")
    .select("*")
    .eq("url", url);

  if (existingError) console.error("Error querying Supabase:", existingError);

  if (existingData && existingData.length > 0) {
    console.log(`Report already exists for ${url}. Skipping audit.`);
    return; // Skip the Lighthouse audit if a report already exists
  }

  // Proceed with Puppeteer and Lighthouse if no existing report is found
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const browserWSEndpoint = browser.wsEndpoint();
  const port = new URL(browserWSEndpoint).port;

  const runnerResult = await lighthouse(url, {
    logLevel: "info",
    output: "json",
    port: port,
  });

  const axeResult = await loadPage(browser, url);

  const results = await axeResult.analyze();

  const numberOfViolations = results.violations.length;

  // Extracting category scores from the report
  const reportJson = JSON.parse(runnerResult.report);

  const scores = {
    performance: reportJson.categories.performance.score * 100,
    accessibility: reportJson.categories.accessibility.score * 100,
    bestPractices: reportJson.categories["best-practices"].score * 100,
    seo: reportJson.categories.seo.score * 100,
    axeViolations: numberOfViolations,
  };

  // Insert new data into Supabase
  const { data, error } = await supabase.from("web").insert([
    {
      url: url,
      performance_score: scores.performance,
      accessibility_score: scores.accessibility,
      best_practices_score: scores.bestPractices,
      seo_score: scores.seo,
      axe_violations: scores.axeViolations,
    },
  ]);

  if (error) console.error("Error inserting data into Supabase:", error);
  else console.log("Data inserted into Supabase:", data);

  await browser.close();
}

async function loadUrlsAndRun() {
  const sitesJsonPath = path.join(path.resolve(), "src", "sites.json");
  const urls = JSON.parse(await fs.readFile(sitesJsonPath, "utf8"));

  for (const url of urls) {
    await runLighthouseAndSaveScores(url).catch(console.error);
  }
}

await loadUrlsAndRun();
