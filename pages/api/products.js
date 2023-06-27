import { mongoosConnect } from "@/lib/mongoose";
import Product from "@/models/product";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handler(req, res){
const {method} = req;
await mongoosConnect();
await isAdmin(req,res);


if(method === "POST"){
 const {title,description,price,images,category,properties} = req.body;
 if(!title){
    return res.status(422).json({error:"Product title is required"});
 }
if(!description){
    return res.status(422).json({error:"Product description is required"});
}
if(!price){
    return res.status(422).json({error:"Product price is required"});
}
if(!category){
    return res.status(422).json({error:"Product category is required"});
}
const product = new Product({
    title,
    description,
    price,
    images,
    category,
    properties
});

try{
    product.save();
    res.status(201).json(product);
}catch(error){
    res.status(500).json({error:"Error in creating product"});
}
}

if(method === 'GET'){
    if(req.query?.id){
        try{
            const product = await Product.findById(req.query?.id);
            res.status(200).json(product);
        }catch(error){
            res.status(500).json({error:"Error in fetching product"});
        }
    }else{
    try{
        const products = await Product.find({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({error:"Error in fetching products"});
    }
}
}

if(method === "PUT"){
    const {title,description,price,_id,images,category,properties} = req.body;
   try{
       await Product.updateOne({_id},{title,description,price,images,category,properties});
       res.status(201).json({message:"Product updated successfully"});
   }catch(error){
       res.status(500).json({error:"Error in updating product"});
   }
   }

if(method === "DELETE"){
    if(req.query?.id){
    try{
        await Product.deleteOne({_id:req.query?.id});
        res.status(201).json({message:"Product deleted successfully"});
    }catch(error){
        res.status(500).json({error:"Error in deleting product"});
    }
}
}
}