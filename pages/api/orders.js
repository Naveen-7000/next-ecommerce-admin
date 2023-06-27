import { mongoosConnect } from "@/lib/mongoose";
import {Order} from "@/models/Order";
import { isAdmin } from "./auth/[...nextauth]";

export default async function handler(req,res) {
  await mongoosConnect();
  await isAdmin(req,res);
  res.json(await Order.find().sort({createdAt:-1}));
}