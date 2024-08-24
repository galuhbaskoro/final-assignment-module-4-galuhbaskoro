import { useState } from "react";
import { RegistrationFormValues } from "../../interface/RegisterForm";
import { useFormik } from "formik";
import { stepOneSchema, stepThreeSchema, stepTwoSchema } from "./registrationValidationSchemas";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";


const Register: React.FC = () => {

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  }

  const handleBackStep = () => {
    setStep(step - 1);
  }

  const navigate = useNavigate();

  const stepTitle = (): string => {
    switch (step) {
      case 1:
        return 'Your Personal Information';
      case 2:
        return 'Your Address Information';
      case 3:
        return 'Your Account Information';
      default:
        return 'Step Error';
    }
  }

  const handleSubmit = (step: number, values: RegistrationFormValues) => {
    if (step === 3) {
      localStorage.setItem('user', 
        JSON.stringify({
          fullName: values.stepOne.fullName,
          dateOfBirth: values.stepOne.dateOfBirth,
          email: values.stepOne.email,
          streestreetAddress:  values.stepTwo.streetAddress,
          city: values.stepTwo.city,
          state: values.stepTwo.state,
          zipCode: values.stepTwo.zipCode,
          username: values.stepThree.username,
          password: values.stepThree.password
      }));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your account has been created",
        text: `Name: ${values.stepOne.fullName}`,
        showConfirmButton: false,
        timer: 1500  
      }).then(()=> {
        navigate("/login");
      });
    }else{
      handleNextStep();
    }
  }

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      stepOne: {
        fullName: '',
        dateOfBirth: '',
        email: ''
      },
      stepTwo: {
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
      },
      stepThree: {
        username: '',
        password: ''
      }
    },
    validationSchema: 
      step === 1 ? stepOneSchema : step === 2 ? stepTwoSchema : stepThreeSchema,
    onSubmit: (values, {setSubmitting}) => {
      setTimeout(() => {
        handleSubmit(step, values)
        setSubmitting(false)
        console.log(values)
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
            <h2 className="font-bold text-xl text-center text-orange-600">
              Register Form Step {step} <br />
              {stepTitle()}
            </h2>
          </div>

          {/* Input Form Steps */}
          { step === 1 ? (
            <StepOne
              values={formik.values.stepOne}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
          ) : step === 2 ? (
            <StepTwo
              values={formik.values.stepTwo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
          ) : (
            <StepThree
              values={formik.values.stepThree}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              errors={formik.errors}
              touched={formik.touched}
            />
          )}

          {/* Submit */}
          <div className="mt-5">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBackStep}
                className="inline-block px-4 py-2 text-sm font-medium text-white border border-transparent rounded-2xl shadow-sm bg-rose-500 hover:bg-rose-600 ml-5"
              >
                <i className="bi bi-arrow-left mr-1"></i>
                Back to Category
              </button>
            )}
            {step < 4 && (
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-2xl shadow-sm hover:bg-green-700"
              >
                {step === 3 ? (
                  <>
                    <i className="bi bi-send-plus mr-1"></i>
                    Register
                  </>
                ) : (
                  <>
                    <i className="bi bi-arrow-right mr-1"></i>
                    Next
                  </>
                )}
              </button>
            )}
          </div>

          {/* Link */}
					<div className="mt-5">
						<p className="text-sm text-slate-600">
							Al Ready have account ??, please 
							<Link to={'/login'}>
								<span className="hover:text-blue-700 hover:font-medium"> Login here</span>
							</Link>
						</p>
					</div>

        </form>
      </div>
    </div>
  );
}

export default Register;