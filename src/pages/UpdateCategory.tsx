import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useCallback, useEffect, useState} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

interface CategoryProps {
  id?: number,
  name: string,
  description: string,
}

const UpdateCategory: React.FC = () => {

  const {id} = useParams<{id: string}>();
  const [existName, setExistName] = useState<string>("");
  const [existDescription, setExistDescription] = useState<string>("");
  const navigate = useNavigate();

  const getData = useCallback( async() => {
    try {
      const response = await axios.get(`http://localhost:8080/categories/${id}`);
      setExistName(response.data['name']);
      setExistDescription(response.data['description']);
    } catch (error) {
      console.error('fetch data gagal', error);
    }
  },[id]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSubmit = async (values:CategoryProps) => {
    try {
      const response = await axios.put(`http://localhost:8080/categories/${id}`, {
        name: values.name,
        description: values.description
      });
      if(response.statusText == 'OK'){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your data has been updated",
          showConfirmButton: false,
          timer: 1500    
        }).then(()=> {
          navigate("/category");
        })
      }
    } catch (error) {
      console.error('failed edit category', error);
    }
  }

  const formik = useFormik<CategoryProps>({
    initialValues: {
      name: existName,
      description: existDescription
    },
    enableReinitialize: true,
    validationSchema: 
      Yup.object().shape({
        name: 
          Yup.string()
          .required('Category Name is required')
          .min(5,'Category Name minimum 5 character')
          .max(40,'Category Name maximum 40 character'),
        description: 
          Yup.string()
          .required('Category Description is required')
          .min(5,'Category Description minimum 5 character')
          .max(40,'Category Description maximum 40 character')
      }),
    onSubmit: (values, {setSubmitting}) => {
      setTimeout(() => {
        handleSubmit(values);
        setSubmitting(false);
      }, 400)
    }
  });

 return(
  <div className="flex flex-wrap flex-row justify-center w-full py-10">
    <div className="flex flex-wrap flex-row w-2/4 p-8 justify-center bg-white border border-gray-200 rounded-lg shadow-md z-50">

      <form 
        onSubmit={formik.handleSubmit}
        className="w-full"
      >
        {/* Title */}
        <div className="mb-5">
          <h2 className="font-bold text-xl text-orange-600">Update Category</h2>
        </div>
        
        {/* Name */}
        <div className="mb-3">
          <label 
            htmlFor="name" 
            className="mb-2 text-sm font-medium text-gray-900">
            Category Name
          </label>
          <input 
            id="name" 
            name="name" 
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            w-full p-2.5"
          />
         {formik.touched.name && formik.errors.name && (
            <div className="text-xs text-red-500 mt-1">{formik.errors.name}</div>
          )}
        </div>
        
        {/* Description */}
        <div className="mb-3">
          <label 
            htmlFor="description" 
            className="mb-2 text-sm font-medium text-gray-900">
            Category Description
          </label>
          <input 
            id="description" 
            name="description" 
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            w-full p-2.5"
          />
         {formik.touched.description && formik.errors.description && (
            <div className="text-xs text-red-500 mt-1">{formik.errors.description}</div>
          )}
        </div>
        
        {/* Submit Button */}
        <div className="mt-5">
          <button
            type="submit" 
            disabled={formik.isSubmitting}
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-2xl shadow-sm hover:bg-green-700"
          >
            <i className="bi bi-send-fill mr-1"></i>
            Update Category
          </button>
          <button
            type="button"
            className="inline-block px-4 py-2 text-sm font-medium text-white border border-transparent rounded-2xl shadow-sm bg-rose-500 hover:bg-rose-600 ml-5"
          >
            <Link to="/category">
              <i className="bi bi-arrow-left mr-1"></i>
              Back to Category
            </Link>
          </button>
        </div>

      </form>
    </div>
  </div>

 );
};

export default UpdateCategory;