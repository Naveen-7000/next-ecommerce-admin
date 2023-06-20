import Layout from "@/component/Layout";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { withSwal } from "react-sweetalert2";

const Category = ({ swal }) => {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState();
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCatogories();
  }, []);

  function fetchCatogories() {
    axios.get("/api/categories").then((res) => {
      setCategories(res?.data?.categories || []);
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const data = { 
      name, 
      parentCategory,
      properties:properties.map(p=>({name:p.name,values:p.values.split(',')})) };
    if (editedCategory) {
      data._id = editedCategory?._id;
      await axios.put("/api/categories", data);
      setEditedCategory(null);
    } else {
      await axios.post("/api/categories", data);
    }
    //  set name to empty string after adding the category
    setName("");
    setParentCategory("");
    setProperties([]);
    fetchCatogories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category?.name);
    setParentCategory(category?.parent?._id);
    setProperties(category?.properties.map(({name,values}) => ({
      name:name,
      values:values.join(',')
    })));
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category?.name} category?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        confirmButtonColor: "#d55",
        reverseButtons: true,
      })
      .then(async (response) => {
        if (response?.isConfirmed) {
          await axios.delete(`/api/categories?id=${category?._id}`);
          fetchCatogories();
        }
      });
  }

  function addProperty() {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  }

  function removeProperty(idx) {
    setProperties((prev) => {
      // return properties which have defferent index values other than idx
      const newProperties = [...prev].filter((property, pIndex)=>{
        return pIndex !== idx;
      });
      return newProperties;
    });
  }

  function handlePropertyNameChange(idx, property, value) {
    setProperties((prev) => {
    //  copy of property array
    const newProperties = [...prev];
    newProperties[idx].name = value;
    return newProperties;
    });
  }
  function handlePropertyValueChange(idx, property, value) {
    setProperties((prev) => {
    //  copy of property array
    const newProperties = [...prev];
    newProperties[idx].values = value;
    return newProperties;
    });
  }
  
  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory?.name}`
          : "Create new category"}
      </label>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory || ""}
            onChange={(e) => setParentCategory(e.target.value) || null}
          >
            <option value="">No parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, idx) => (
              <div key={idx} className="flex gap-1 mt-1">
                <input
                  type="text"
                  value={property.name}
                  onChange={(e)=>handlePropertyNameChange(idx, property,e.target.value)}
                  placeholder="Property name (example:color)"
                />
                <input
                  type="text"
                  value={property.values}
                  onChange={(e)=>handlePropertyValueChange(idx, property,e.target.value)}
                  placeholder="values, comma seprated"
                />
                <button type="button" onClick={()=>removeProperty(idx)} className="btn-default mb-2">Remove</button>
              </div>
            ))}
        </div>
        {editedCategory && (
        <button className="btn-red mr-1" type="button" onClick={()=>{
          setEditedCategory(null)
          setName('');
          setParentCategory('');
          setProperties([]);
        }
        }>
          Cancel
        </button>
        )}
        <button className="btn-primary" type="submit">
          Save
        </button>
      </form>
      {!editedCategory && (
      <table className="basic mt-4">
        <thead>
          <tr>
            <td className="px-4 py-2">Category name</td>
            <td className="px-4 py-2">Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td className="flex gap-1">
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-primary flex justify-center items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-primary flex justify-center items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      )}
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Category swal={swal} />);
