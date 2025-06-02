import express from "express";
const router = express.Router();
export default router;
import {getFolderById, getFileById, getFiles, getFolders, createFiles } from "#db/queries/folders";


router.route("/files").get(async (req, res) => {
  const files = await getFiles();
  res.send(files);
})


router.route("/folders").get(async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
})


router.route("/folders/:id").get(async (req, res) => {
  const id = Number(req.params.id)

  if(!Number.isInteger(id) || id < 0){
    return res.status(400).send({error: "Please send a valid number"})
  }

  const folder = await getFolderById(id)
  if(!folder){
    return res.status(404).send({error: "Folder does not exist"})
  }

  res.send(folder)
})


router.route("/folders/:id/files").post(async (req, res) => {
  const id = Number(req.params.id)

  if(!Number.isInteger(id) || id < 0){
    return res.status(400).send({error: "Please send a valid number"})
  }

  const folder = await getFolderById(id)
  if(!folder){
    return res.status(404).send({error: "Folder does not exist"})
  }

    if(!req.body){
    return res.status(400).send({error: "Missing request body"})
  }
  
  const {name, size} = req.body

  if(!name || !size){
    return res.status(400).send({error: "Missing required params"})
  }

  const newFile = await createFiles ({name, size, folder_id: id})

  res.status(201).send(newFile)
})