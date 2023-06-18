import Layout from "@/component/Layout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";

export default function DeleteProdcutPage(){

    const router = useRouter();
    const [productInfo,setProductInfo] = useState();
    const {id} = router.query;
    console.log(id);
    useEffect(()=>{
        // handle delete call
        if(!id)return;
        (async ()=>{
            await axios.get(`/api/products?id=${id[0]}`).then((res)=>{
                setProductInfo(res.data);
                console.log(productInfo);}).catch((err)=>{console.log(err);
            })
        })();
    },[])

    function goBack(){
        router.push("/products")
    }

   async function deleteProduct(){
      await axios.delete(`/api/products?id=${id[0]}`).then(()=>{goBack()}).catch((err)=>{console.log(err);});
    }
    return (
        <Layout>
        <h1 className="text-center">Do you really want to delete&nbsp;&quot;{productInfo?.title}&quot;?</h1>
        <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button className="btn-default" onClick={goBack}>No</button>
        </div>
        </Layout>
    )
}