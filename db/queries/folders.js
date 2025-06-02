import db from "#db/client";

export async function createFolder(name) {
    const result = await db.query(
        'INSERT INTO folders (name) VALUES ($1) RETURNING *;', [name]
    );
    return result.rows[0];
};


export async function createFiles({name, size, folder_id}) {
    const result = await db.query(
        'INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3) RETURNING *;', [name, size, folder_id]
    );
    return result.rows[0]; 
};


export async function getFolders() {
    const result = await db.query('SELECT * FROM Folders;');
    return result.rows;
};


export async function getFilesByFolders(folder_id) {
    const result = await db.query('SELECT * FROM files WHERE folder_id = $1;', [folder_id]);
    return result.rows;
};