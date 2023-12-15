import express from 'express'
import { uploadRoutes } from './routes'
import 'dotenv/config'

const app = express()
const port = 3000

app.listen(port, () => {
  console.log(`> Listening on port: ${port}`)
})

app.use('/upload', uploadRoutes)

// TOOD: Set up express server with Multer, Sharp & AWS-SDK
// To setup and save files into an S3 bucket

// GOAL: To understand how multipart-formdata works amongst other things.
// More or less an exercise in improving knowledge of how this is done &
// learn, so that the lessons can be taken into the Lambda implementation.

// Should return a signed URL once the upload is complete
