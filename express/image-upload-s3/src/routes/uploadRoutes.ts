import express from 'express'
import { uploadController } from '../controllers'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 10_000_000 }
})

const uploadRouter = express.Router()

uploadRouter.post('/', upload.single('uploaded_image'), uploadController.uploadImage)

export default uploadRouter
