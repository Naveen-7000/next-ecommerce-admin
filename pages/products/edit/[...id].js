import Layout from "@/component/Layout";
import ProductForm from "@/component/ProductForm";
import axios from "axios";
import { useRouter } from "next/router";
import React,{ useEffect,useState } from "react";

export default function EditProductPage(){
    const router  = useRouter();
    const [product,setProduct] = useState(null);
    const {id} = router?.query;
    useEffect(() => {
       (async () => {
              const res = await axios.get(`/api/products?id=${id}`);
              const product = res.data;
              setProduct(product);
         })();
    }, [id])
    return(
        <Layout>
            <h1>Edit Product</h1>
            {product && (
                <ProductForm {...product}/>
            )}
        </Layout>
    );
}