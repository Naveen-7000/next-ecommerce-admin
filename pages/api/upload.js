import multiparty from 'multiparty';
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime-types';
import { mongoosConnect } from '@/lib/mongoose';
import { isAdmin } from './auth/[...nextauth]';
const bucketName = 'shanksnext-ecommerce';

export default async function handler(req, res) {
  await mongoosConnect();
await isAdmin(req,res);
    const form = new multiparty.Form();
    // parse the request
    form.parse(req, async (err, fields, files) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: err.message });
    }
    console.log(files);
    // here i am creating a s3 client with the help of aws-sdk using credentials and region
    const client  = new S3Client({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    })
   const links = []; // here i want to collect all the links of files uploaded
    // now i want to make each file name unique  also here i am sending the file to s3 bucket
    for(const file of files.file){
      const extension = file.originalFilename.split('.').pop();
      const fileName = Date.now() + '.' + extension;
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key:fileName,
      Body: fs.readFileSync(file?.path), //here i need to send the file buffer using fs
      ACL: 'public-read',
      ContentType: mime.lookup(file?.path) // here i am using mime-types because i am not sure about ext of file comming from client
    }))
    // now collect link of all files and send it to client
    const link = `https://${bucketName}.s3.amazonaws.com/${fileName}`;
    links.push(link);
    }
    res.status(200).json({message:"File uploaded successfully",links:links});
  }
    );
}

// here we want to handle parsing by our self so we use the following code(avoiding by default next.js parsing)
export const config = {
    api: { bodyParser: false },
}