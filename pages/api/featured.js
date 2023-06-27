import { Featured } from "@/models/Feature";
export default async function handler(req, res) {
    const {product} = req.body;

    if(req.method === 'POST'){
        // Clear the existing featured product
        await Featured.deleteMany();
        const featured = new Featured({product});
        await featured.save();
        res.status(201).json({product})
    }

    if(req.method === 'GET'){
        await Featured.find().populate('product').then(featured => {
        res.status(200).json(featured[0]);
      })
    }
  }