import db from "#db/client";
import { createFolder, createFiles } from "./queries/folders.js";

// await db.connect();
// await seed();
// await db.end();
// console.log("🌱 Database seeded.");

async function seed() {
  await db.connect();

  const folderNames = ['Documents', 'Images', 'Music', 'Shows', 'Emails'];

  for (const folderName of folderNames) {
    const folder = await createFolder(folderName);

    for (let i = 1; i <=100; i++) {
      await createFiles({
        name: `file${i}.txt`,
        size: i * 100, 
        folder_id: folder.id
      });
    }
  }

  console.log("🌱 Database seeded.");
  await db.end();

}


seed();