import React from "react"

interface StepThreeProps {
  values: {
    username: string
    password: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepThree?: {
      username?: string
      password?: string
    }
  }
  touched: {
    stepThree?: {
      username?: boolean
      password?: boolean
    }
  }
}

const stepThree = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepThreeProps) => {
  
  return(
    <React.Fragment>

      {/* Username */}
      <div className="mb-3">
        <label 
          htmlFor="username" 
          className="mb-2 text-sm font-medium text-gray-900">
          Username
        </label>
        <input 
          id="username" 
          name="stepThree.username" 
          type="text"
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepThree?.username && errors.stepThree?.username && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepThree.username}
          </div>
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
          name="stepThree.password" 
          type="password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepThree?.password && errors.stepThree?.password && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepThree.password}
          </div>
        )}
      </div>
      
      


    </React.Fragment>
  );
}

export default stepThree;