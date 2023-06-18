import { useState } from "react";
import axios from "axios";
import {useRouter} from "next/router";

export default function ProductForm({title:existingTitle,description:existingdescription,price:existingprice,_id,images:existingImages}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingdescription ||"");
  const [images,setImages] = useState(existingImages || "");
  const [price, setPrice] = useState(existingprice || '');
  const router = useRouter();

  const createProdcut = async (e) => {
    e.preventDefault();
    const product = { title, description, price,_id };
    console.log(product,"Product");
    // handle edit and create api 
    if(_id){
        // update
        await axios
          .put("/api/products", product)
          .then(() => {
            router.push("/products");
          })
          .catch((error) => console.log(error));
    }else{
        // create
        await axios
          .post("/api/products", product)
          .then(() => {
            router.push("/products");
          })
          .catch((error) => console.log(error));
      };
    }

    async function uploadImages(e){
    const files = e.target?.files;
    if(files.length > 0){
      //  handle undefined and null
      const data = new FormData();
      for(const file of files){
        data.append('file',file);
      };
      const res = await axios.post("/api/upload",data);
      console.log(res.data);
    }
    }

  return (
    <form onSubmit={createProdcut}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="Product Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label>Photo</label>
      <div className="mb-2">
        <label className="w-24 h-24 cursor-pointer bg-gray-200 text-sm gap-1 rounded-lg text-center text-gray-500 flex justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
</svg>
<div>Upload</div>
<input className="hidden" type="file" value={images} onChange={uploadImages} />
</label>
        {!images?.length && (
          <div>No photos in this product</div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="Product description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Price (in INR)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
