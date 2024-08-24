import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface FormData {
 email: string,
 password: string,
 confirmPassword: string
}

const Register: React.FC = () => {
  
	const navigate = useNavigate();
	const handleSubmit = (values: {
  	email: string,
   	password: string,
   	confirmPassword: string
  }) => {
   	localStorage.setItem(
    "user",
    JSON.stringify({
    	email: values.email,
    	password: values.password
    })
  );
  Swal.fire({
  	position: "center",
    icon: "success",
    title: "Your account has been created",
    text: `Email: ${values.email}`,
    showConfirmButton: true  
  }).then(()=> {
    navigate("/");
  })};

  const formik = useFormik<FormData>({
  	initialValues: {
    	email: "", 
    	password: "", 
    	confirmPassword: ""
   	},
		validateOnBlur: true,
		validateOnChange: true,
   	validationSchema: Yup.object({
			email: 
    		Yup.string()
				.email()
				.required("Email is required"),
    	password: 
    		Yup.string()
				.matches(
      		/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      		"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    		)
				.required("Password is required"),
			confirmPassword: 
				Yup.string()
				.oneOf([Yup.ref("password")], "Password doesn’t match, try again.")
				.required("Required")
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
						<h2 className="font-bold text-xl text-orange-600">Register</h2>
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

					{/* Confirm Password */}
					<div className="mb-3">
						<label 
							htmlFor="confirmPassword" 
							className="mb-2 text-sm font-medium text-gray-900">
							Confirm Password
						</label>
						<input 
            	id="confirmPassword" 
            	name="confirmPassword" 
            	type="password"
            	onChange={formik.handleChange}
            	onBlur={formik.handleBlur}
            	className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl block 
            	w-full p-2.5"
          	/>
						{formik.touched.confirmPassword && formik.errors.confirmPassword && (
            	<div className="text-xs text-red-500 mt-1">{formik.errors.confirmPassword}</div>
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
            Register
          </button>
        </div>

				</form>
			</div>
		</div>
	)
}

export default Register;