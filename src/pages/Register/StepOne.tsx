import React from "react"

interface StepOneProps {
  values: {
    fullName: string
    dateOfBirth: string
    email: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepOne?: {
      fullName?: string
      dateOfBirth?: string
      email?: string
    }
  }
  touched: {
    stepOne?: {
      fullName?: boolean
      dateOfBirth?: boolean
      email?: boolean
    }
  }
}

const StepOne = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepOneProps) => {
  
  const today = new Date();
  const minDate = new Date(today.setFullYear(today.getFullYear() - 17));
  const minDateString = minDate.toISOString().split('T')[0];

  return(
    <React.Fragment>

      {/* Name */}
      <div className="mb-3">
        <label 
          htmlFor="fullName" 
          className="mb-2 text-sm font-medium text-gray-900">
          Full Name
        </label>
        <input 
          id="fullName" 
          name="stepOne.fullName" 
          type="text"
          value={values.fullName}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepOne?.fullName && errors.stepOne?.fullName && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepOne.fullName}
          </div>
        )}
      </div>

      
      {/* Birth Date */}
      <div className="mb-3">
        <label 
          htmlFor="dateOfBirth" 
          className="mb-2 text-sm font-medium text-gray-900">
          Birth Date
        </label>
        <input 
          id="dateOfBirth" 
          name="stepOne.dateOfBirth" 
          type="date"
          value={values.dateOfBirth}
          max={minDateString}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepOne?.dateOfBirth && errors.stepOne?.dateOfBirth && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepOne.dateOfBirth}
          </div>
        )}
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
          name="stepOne.email" 
          type="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepOne?.email && errors.stepOne?.email && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepOne.email}
          </div>
        )}
      </div>


    </React.Fragment>
  );
}

export default StepOne;