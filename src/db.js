import { fileURLToPath } from "node:url";
import fs from "fs/promises";

const DB_Path = fileURLToPath(new URL("../db.json", import.meta.url));

console.log(DB_Path);

export const getDB = async () => {
  const db = await fs.readFile(DB_Path, "utf-8");
  return JSON.parse(db);
};

export const saveDB = async (db) => {
  await fs.writeFile(DB_Path, JSON.stringify(db, null, 2));
  return db;
};

export const insertDB = async (data) => {
  const db = await getDB();
  db.stories.push(data);
  await saveDB(db);
  return data;
};

export const delDB = async (id) =>{
  let db = await getDB();
  db.stories = db.stories.filter((s)=> s.id != id)
  await saveDB(db)
  console.log("Story Successfully Deleted")
  return db.stories
}

// For debugging :
// (async () => {
//   try {
//     // First read
//     let data = await getDB();
//     console.log("Initial DB:", data);

//     // Insert data
//     await insertDB(2);

//     // Second read
//     data = await getDB();
//     console.log("Updated DB:", data);
//   } catch (err) {
//     console.error("Error:", err);
//   }
// })();