import { fileURLToPath } from "node:url";
import fs from "fs/promises";

const DB_Path = fileURLToPath(new URL("../db.json", import.meta.url));

console.log(DB_Path);

async function getData(DB_Path) {
  try {
    const data = await fs.readFile(DB_Path, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    throw err; // Re-throw the error to handle it when calling getData
  }
}

// Properly handle the Promise returned by getData
getData(DB_Path)
  .then((data) => console.log(data))
  .catch((err) => console.error("Error in getData:", err));
