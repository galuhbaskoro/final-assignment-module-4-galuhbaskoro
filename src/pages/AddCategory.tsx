import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import {Categories} from "../interface/Categories";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddCategory: React.FC = () => {

  const [categories, setCategories] = useState<Categories[]>([]);
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    description: ""
  }

  const validationSchema = Yup.object({
    name: 
      Yup.string()
      .required('Category Name is required')
      .min(5,'Category Name minimum 5 character')
      .max(40,'Category Name maximum 40 character'),
    description: 
      Yup.string()
      .required('Category Description is required')
      .min(5,'Description Name minimum 5 character')
      .max(40,'Description name maximum 40 character')
  });

  const addCategory = async (values: {
    name: string,
    description: string
  }) => {
    if(!values.name || !values.description){
      return;
    }else{
      try {
        const response = await axios.post(
        "http://localhost:8080/categories",
        {
        name: values.name,
        description: values.description
        });
        setCategories([...categories, response.data]);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Success",
          text: `${values.name} Category has been created`,
          showConfirmButton: false,
          timer: 1500    
        }).then(()=> {
          navigate("/category");
        });
      } catch (error) {
        console.error('Adding Category Failed: ', error);
      }
    }
  };

 return (

  <div className="flex flex-wrap flex-row justify-center w-full py-10">

    <div className="flex flex-wrap flex-row w-2/4 p-8 justify-center bg-white border border-gray-200 rounded-lg shadow-md">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={addCategory}
        validateOnChange={false}
      >
        {({isSubmitting})=>(
          <Form className="w-full">

            {/* Title */}
            <div className="mb-5">
              <h2 className="font-bold text-xl text-orange-600">Add New Category</h2>
            </div>
          
            {/* Name */}
            <div className="mb-3">
              <label 
                htmlFor="name" 
                className="mb-2 text-sm font-medium text-gray-900">
                Category Name
              </label>
              <Field 
                id="name" 
                name="name" 
                type="text" 
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
                w-full p-2.5"
              />
              <ErrorMessage 
                name="name" 
                component="div" 
                className="text-sm text-red-400 mt-1"
              />
            </div>
          
            {/* Description */}
            <div className="mb-3">
              <label 
                htmlFor="name" 
                className="mb-2 text-sm font-medium text-gray-900">
                  Category Description
              </label>
              <Field 
                id="description" 
                name="description" 
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
                w-full p-2.5"
              />
              <ErrorMessage 
                name="description" 
                component="div" 
                className="text-sm text-red-400 mt-1"
              />
            </div>
          
            {/* Button */}
            <div className="mt-5">
              <button
                type="submit" 
                disabled={isSubmitting}
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-2xl shadow-sm hover:bg-green-700"
              >
                <i className="bi bi-send-plus mr-1"></i>
                Add New Category
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

          </Form>
        )}
      </Formik>
      </div>
  </div>
 );
};

export default AddCategory;