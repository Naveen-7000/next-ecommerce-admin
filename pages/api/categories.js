import Category from "@/models/Category";
import { mongoosConnect } from "@/lib/mongoose";
import { isAdmin } from "./auth/[...nextauth]";
export default async function handle(req, res) {
  // mongoose connection
  await mongoosConnect();
  const { method } = req;

  await isAdmin(req,res);
  if (method === "POST") {
    const { name, parentCategory,properties} = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    const newCategory = await new Category({ name,properties});
    if (parentCategory) {
        newCategory.parent = parentCategory;
    }
    try {
      newCategory.save();
      res.status(201).json({ success: true, newCategory });
    } catch (error) {
      res.status(500).json({ error: "Error in creating catogory" });
    }
  }

  if (method === "GET") {
    const categories = await Category.find({}).populate("parent");
    res.status(200).json({ success: true, categories });
  }

  if(method === 'PUT'){
    const { name, parentCategory,_id,properties } = req.body;
    if(!_id){
        return res.status(400).json({error:"Category id is required"});
    }
    try{
       const category = await Category.updateOne({_id},{name,parent:parentCategory,properties});
        res.status(201).json({message:"Category updated successfully",category});
    }catch(error){
        res.status(500).json({error:"Error in updating category"});
    }

  }

  if(method === 'DELETE'){
    const {id} = req.query;
    if (id) {
      try {
        await Category.deleteOne({ _id:id });
        return res.status(201).json({ message: "Category deleted successfully" });
      } catch (error) {
        return res.status(500).json({ error: "Error in deleting category" });
      }
    } else {
      return res.status(400).json({ error: "Missing _id parameter" });
    }
  }
}
