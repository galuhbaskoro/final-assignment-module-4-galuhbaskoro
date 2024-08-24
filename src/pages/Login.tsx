import { useFormik } from "formik";
import * as Yup from "yup";
// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface FormData {
	email: string,
	password: string,
 }

const Login: React.FC = () => {

	// const email = useState<string>("");
	// const password = useState<string>("");
	const navigate = useNavigate();

	const handleSubmit = (values: {email:string, password:string}) => {
		// e.preventDefault();
		const storedUser = localStorage.getItem("user");
		if(storedUser){
			const { email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
			if(values.email === storedEmail && values.password === storedPassword){
				localStorage.setItem("login-token", "j2OsxJTMGIPuCFjjAQ4i");
				Swal.fire({
					position: "center",
          icon: "success",
					title: "Login Success",
          showConfirmButton: false,
          timer: 1500
				}).then(()=>{
					navigate('/category');
				});
			}else{
				Swal.fire({
					position: "center",
          icon: "error",
					title: "Login Failed",
          showConfirmButton: false,
          timer: 1500
				}).then(()=>{
					navigate('/login');
				});
			}
		}
	}

	const formik = useFormik<FormData>({
  	initialValues: {
    	email: "", 
    	password: "", 
   	},
		validateOnBlur: true,
		validateOnChange: true,
   	validationSchema: Yup.object({
			email: 
    		Yup.string()
				.email()
				.required("Email is required"),
    	password: 
    		Yup.string().required("Password is required"),
		}),
   	onSubmit: (values, {setSubmitting}) => {
    	setTimeout( () => {
      	handleSubmit(values);
      	setSubmitting(false);
    }, 400)}
  });

	return (
		<div className="flex flex-wrap flex-row justify-center w-full py-10">
			<div className="flex flex-wrap flex-row w-2/4 p-8 justify-center bg-white border border-gray-200 rounded-lg shadow-md z-50">
				<form
					onSubmit={formik.handleSubmit}
					className="w-full"
				>
					{/* Title */}
					<div className="mb-5">
						<h2 className="font-bold text-xl text-orange-600">Login</h2>
					</div>

					{/* Email */}
					<div className="mb-3">
						<label 
							htmlFor="email" 
							className="mb-2 text-sm font-medium text-gray-900">
							Email
						</label>
						<input 
            	id="email" 
            	name="email" 
            	type="email"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.email && formik.errors.email && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
          	)}
					</div>

					{/* Password */}
					<div className="mb-3">
						<label 
							htmlFor="password" 
							className="mb-2 text-sm font-medium text-gray-900">
							Password
						</label>
						<input 
            	id="password" 
            	name="password" 
            	type="password"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.password && formik.errors.password && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.password}</div>
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
							Login
						</button>
        	</div>

					{/* Link */}
					<div className="mt-5">
						<p className="text-sm text-slate-600">
							Not yet have account ??, please 
							<Link to={'/register'}>
								<span className="hover:text-blue-700 hover:font-medium"> Register here</span>
							</Link>
						</p>
					</div>

				</form>
			</div>
		</div>
	)
}

export default Login;