import { Request, Response } from 'express'
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const client = new S3Client({
  region: process.env['AWS_REGION']
})

/** Handler to manage uploading an image & generating a corresponding signed URL.
 * @expiration 1 hour
 */
export async function uploadImage(req: Request, res: Response) {
  const { originalname, mimetype, buffer } = req.file
  const [filename, ext] = originalname.split('.')

  // Uploading the image Object from the storage buffer into S3.
  const putCommand = new PutObjectCommand({
    Bucket: process.env['S3_BUCKET_NAME'],
    Key: `uploads/${filename}-dev.${ext}`,
    Body: buffer,
    ContentType: mimetype
  })

  // Get the uploaded image Object for generating a presigned URL.
  const getCommand = new GetObjectCommand({
    Bucket: process.env['S3_BUCKET_NAME'],
    Key: `uploads/${filename}-dev.${ext}`
  })

  try {
    await client.send(putCommand) // TODO: handle failed response
    const url = await getSignedUrl(client, getCommand, { expiresIn: 3600 }) // 1 hr expiration
    res.json({
      message: `Successfully uploaded ${filename}-dev.${ext}`,
      signedUrl: url
    })
  } catch (err) {
    console.error(err)
  }
}
