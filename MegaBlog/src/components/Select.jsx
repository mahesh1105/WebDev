import React, { useId, forwardRef } from "react";

// options param is usually an array
const Select = forwardRef(({options, label, className='', ...props}, ref) => {
  // Generate the unique ID on each render
  const id = useId();
  
  return (
    <div className="w-full">
      {label && <label htmlFor={id} className=""></label>}
      <select 
        {...props} 
        id={id} 
        ref={ref} 
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
})

export default Select;

/*
  React passes the value from one component to another component in the form of object

  Note: whenever key is written while calling the components then 'it is not passed as the prop to the component'
  Instead it will be used to differentiate between the components when it rendered multiple times

  Also, in case of ref, 'it is not passed as normal prop', instead you need to use "React.forwardRef"
  if you are passing ref to your custom Component, you have to use forwardRef in your custom component
  ref is basically used for referencing the dom element, where ever you are using it you can get the reference for it
  
  Note: forwardRef will take the callback

  Ex:
  ---
  const Input = forwardRef((props, ref) => {
    const { index, value, onOtpChange } = props;
    // Now you can safely use `ref` separately
  });

  So you’re NOT destructuring ref from the props — you’re grabbing it as the second param.

  Note:
  -----
  Whenever you are using map, make sure while rendering the elements inside it,
  you must pass a key attribute for uniqueness of them

  Note:
  -----
  If you are passing ref prop but not using forwardRef while creating the function OR component
  then you can use forwardRef while exporting that component

  export default React.forwardRef(Select)

  both of them will work same
*/