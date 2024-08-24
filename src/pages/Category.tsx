import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import {Categories} from "../interface/Categories";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Category: React.FC = () => {

  
  let number:number = 1;
  const [categories, setCategories] = useState<Categories[]>([]);
  const navigate = useNavigate();
  
  
  const handleAddCategory = () => {
    navigate("/addcategory");
  }
  
  const getCategories = useCallback( async () => {
    try {
      const response = await axios.get("http://localhost:8080/categories");
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  },[]);
  
  useEffect(() => {
    if(!localStorage.getItem('login-token')){
      navigate('/login');
    }else{
      getCategories();
    }
  }, [navigate, getCategories]);
  

  const deleteCategory = async (id:number) => {
    try {
      await axios.delete(`http://localhost:8080/categories/${id}`);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category", error)
    }
  };

  return (
  
    <div className="flex flex-row flex-wrap w-full px-5 py-5 justify-items-center">

      <button
        onClick={handleAddCategory}
        className="inline-block py-2 px-4 my-3 mt-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 border-transparent rounded-2xl">
          <i className="bi bi-bookmark-plus mr-1"></i>
          Add New Category
      </button>

      <table className="w-full rtl:text-right border border-gray-200 rounded-lg shadow-md">
        <thead className=" text-white text-base bg-gray-500 text-center">
        <tr>
          <th scope="col" className="px-6 py-3">No.</th>
          <th scope="col" className="px-6 py-3">Category Name</th>
          <th scope="col" className="px-6 py-3">Descriptions</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
        </thead> 
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b dark:border-gray-700 hover:bg-gray-50">
            <td scope="row" className="px-6 py-4 font-medium text-slate-700 text-center">
              {number++}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-slate-700">
              {category.name}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-slate-700">
              {category.description}
            </td>
            <td scope="row" className="px-6 py-4 font-medium text-center">
            <button
                type="button"
                onClick={()=> {navigate(`/updatecategory/${category.id}`)}}
                className="inline-block py-2 px-4 my-2 mt-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 border-transparent rounded-2xl"
              >
                <i className="bi bi-pencil-square mr-1"></i>
                Update
              </button>
              <button
                type="button"
                onClick={ 
                  () => Swal.fire({
                    title: "Are you sure want to delete ??",
                    text: `${category.name} will deleted permanent`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, Delete",
                    confirmButtonColor: "#F05252",
                    cancelButtonColor: "#057A55"
                  }).then((result) => {
                    if(result.isConfirmed){
                      deleteCategory(category.id).then(
                        ()=>{
                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Your data has been deleted",
                            showConfirmButton: false,
                            timer: 1500    
                          });
                        }
                      )
                    }    
                  })
                }
                className="inline-block py-2 px-4 my-2 mx-2 text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 border-transparent rounded-2xl"
              >
                <i className="bi bi-trash3"></i> Delete
              </button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default Category;