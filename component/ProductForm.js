import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  title: existingTitle,
  description: existingdescription,
  price: existingprice,
  _id,
  images: existingImages,
  category: existingCategory,
  properties:assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existingdescription || "");
  const [images, setImages] = useState(existingImages || []);
  const [price, setPrice] = useState(existingprice || "");
  const [category,setCategory] = useState(existingCategory || "");
  const [productProperties,setProductProperties] = useState(assignedProperties || {});
  const [categories, setCategories] = useState([]);
  const [isUploading,setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  const createProdcut = async (e) => {
    e.preventDefault();
    const product = { title, description, price,images,category,properties:productProperties};
    console.log(product, "Product");
    // handle edit and create api
    if (_id) {
      // update
      await axios
        .put("/api/products", {...product,_id})
        .then(() => {
          router.push("/products");
        })
        .catch((error) => console.log(error));
    } else {
      // create
      await axios
        .post("/api/products", product)
        .then(() => {
          router.push("/products");
        })
        .catch((error) => console.log(error));
    }
  };

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files.length > 0) {
      setIsUploading(true);
      //  handle undefined and null
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
    }
    setIsUploading(false);
  }

  function updateImagesOrder(images){
    setImages(images);
  }

  function setProductProp(propName,value) {
    setProductProperties(prev => {
      const newProductProps = {...prev};
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if(categories.length > 0 && category){
    let catInfo = categories.find(({_id})=>_id === category); //getting info of selected category
    propertiesToFill.push(...catInfo.properties); //pushing properties of selected category
    // // now i want to get properties parent object information
    while(catInfo?.parent?._id){
      const parentInfo = categories.find(({_id})=>_id === catInfo?.parent?._id);
            propertiesToFill.push(...parentInfo.properties);
            catInfo = parentInfo;
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
      <label>Category</label>
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option value="">Uncategorized</option>
        {
          categories.map((category)=>(
            <option key={category._id} value={category._id}>{category.name}</option>
          ))
        }
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
           <div key={p.name} className="">
           <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
           <div>
             <select value={productProperties[p.name]}
                     onChange={ev =>
                       setProductProp(p.name,ev.target.value)
                     }
             >
               {p.values.map(v => (
                 <option key={v} value={v}>{v}</option>
               ))}
             </select>
           </div>
         </div>
        ))}
      <label>Photo</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable list={images} className="flex flex-wrap gap-1" setList={updateImagesOrder}>
        {!!images?.length && images.map((link)=>(
          <div key={link} className="h-24 rounded-lg">
            <img src={link} alt="uploaded images" width={96} height={96} />
            </div>
        ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex justify-center items-center p-2">
            <Spinner />
          </div>
        )
        }
        <label className="w-24 h-24 cursor-pointer bg-gray-200 text-sm gap-1 rounded-lg text-center text-gray-500 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input
            className="hidden"
            type="file"
            // value={images[0]}
            onChange={uploadImages}
          />
        </label>
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
