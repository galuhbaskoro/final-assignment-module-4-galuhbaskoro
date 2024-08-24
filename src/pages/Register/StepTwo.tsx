import React from "react"

interface StepTwoProps {
  values: {
    streetAddress: string
    city: string
    state: string
    zipCode: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepTwo?: {
      streetAddress?: string
      city?: string
      state?: string
      zipCode?: string
    }
  }
  touched: {
    stepTwo?: {
      streetAddress?: boolean
      city?: boolean
      state?: boolean
      zipCode?: boolean
    }
  }
}

const StepTwo = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepTwoProps) => {
  
  return(
    <React.Fragment>

      {/* Street Adress */}
      <div className="mb-3">
        <label 
          htmlFor="streetAddress" 
          className="mb-2 text-sm font-medium text-gray-900">
          Street Adreess
        </label>
        <input 
          id="streetAddress" 
          name="stepTwo.streetAddress" 
          type="text"
          value={values.streetAddress}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepTwo?.streetAddress && errors.stepTwo?.streetAddress && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepTwo.streetAddress}
          </div>
        )}
      </div>

      
      {/* City */}
      <div className="mb-3">
        <label 
          htmlFor="city" 
          className="mb-2 text-sm font-medium text-gray-900">
          City
        </label>
        <input 
          id="city" 
          name="stepTwo.city" 
          type="text"
          value={values.city}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepTwo?.city && errors.stepTwo?.city && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepTwo.city}
          </div>
        )}
      </div>

      {/* State */}
      <div className="mb-3">
        <label 
          htmlFor="state" 
          className="mb-2 text-sm font-medium text-gray-900">
          State
        </label>
        <input 
          id="state" 
          name="stepTwo.state" 
          type="text"
          value={values.state}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepTwo?.state && errors.stepTwo?.state && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepTwo.state}
          </div>
        )}
      </div>

      {/* Zip Code */}
      <div className="mb-3">
        <label 
          htmlFor="zipCode" 
          className="mb-2 text-sm font-medium text-gray-900">
          Zip Code
        </label>
        <input 
          id="zipCode" 
          name="stepTwo.zipCode" 
          type="text"
          value={values.zipCode}
          onChange={onChange}
          onBlur={onBlur}
          className="bg-gray-50 border border-gray-300text-gray-900 text-sm rounded-xl block 
          w-full p-2.5"
        />
        {touched.stepTwo?.zipCode && errors.stepTwo?.zipCode && (
          <div className="text-xs text-red-500 mt-1">
            {errors.stepTwo.zipCode}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default StepTwo;