import Layout from "@/component/Layout";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Setting(){
    const [products,setProducts] = useState([]);
    const [featured,setFeatured] = useState(null);
    
    useEffect(() => {
      (async () => {
      await axios.get('/api/products').then(response => {
        setProducts(response.data);
      });
      })();
    }, []);

    async function getFeatured(){
     await axios.get('/api/featured').then(response => {
        setFeatured(response.data);
      });
    }

    useEffect(() => {
      getFeatured();
    }, []);

    console.log(featured);

    async function handleSubmit(e){
        e.preventDefault();
        await axios.post('/api/featured', {product: featured});
        await getFeatured();
    }
  return (
   <Layout>
    <label>
       Add featured product
      </label>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1">
        <select
            value={featured || ""}
            onChange={(e) => setFeatured(e.target.value) || null}
          >
            {products.length > 0 &&
              products.map((product) => (
                <option key={product._id} value={product._id}>
                  {product.title}
                </option>
              ))}
          </select>
        </div>
        <button className="btn-primary" type="submit">
          Save
        </button>
        </form>
        <div className="mt-4">
          <table className="basic">
        <thead>
          <tr>
            <td>Featured Product</td>
          </tr>
          </thead>
          <tbody>
          {featured && (
            <tr>
              <td>{featured?.product?.title}</td>
            </tr>
          )}
          </tbody>
          </table>
        </div>
   </Layout>
  )
}