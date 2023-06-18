import multiparty from 'multiparty';
import {S3Client,PutObjectCommand} from '@aws-sdk/client-s3';
const bucketName = 'shanksnext-ecommerce';
export default async function handler(req, res) {
    const form = new multiparty.Form();
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

    // now i want to make each file name unique  also here i am sending the file to s3 bucket
    for(const file of files.file){
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key:''
    }))
    }
    res.status(200).json({message:"File uploaded successfully"});
  }
    );
}

// here we want to handle parsing by our self so we use the following code(avoiding by default next.js parsing)
export const config = {
    api: { bodyParser: false },
}