// Custom reusable input component
import React, {useId} from "react";

// While passing props to the functions, we have set the default value for some params, 
// if these are not passed then it is used
const Input = React.forwardRef(function Input({ label, type="text", className="", ...props }, ref) {
  // useId is a React Hook (added in React 18) that generates a unique ID on every render. 
  // It’s useful for accessibility features like associating labels and form inputs.
  const id = useId();

  return (
    <div className="w-full">
      {label && 
        <label 
          className="inline-block mb-1 pl-1" 
          htmlFor={props.id}
        >
          {label}
        </label>
      }
      <input 
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
        id={id}
        {...props}
        />
    </div>
  )
})

export default Input;

/*
  while passing any value to the attribute, if its hardcoded you can use double("") or single('') quotes
  But if you are getting its value from the prop then use curly braces({}), it will tell you are injecting the JS value OR
  if it is the combination of both props and hardcoded then use backticks(``) with curly braces({})

  ref:
  ----
  ref stands for reference, and in React, it gives you a way to directly access a DOM element or a component instance.
  
  const inputRef = useRef();
  inputRef.current will eventually point to the actual <input> DOM element once it’s rendered.

  ✅ Using Refs With Standard Elements
  Here's the basic way refs are used without forwardRef:

  function MyComponent() {
    const inputRef = useRef();

    const focusInput = () => {
      inputRef.current.focus();  // Native DOM method
    };

    return (
      <div>
        <input ref={inputRef} type="text" />
        <button onClick={focusInput}>Focus Input</button>
      </div>
    );
  }

  This works great — because <input> is a native DOM element, React knows how to forward the ref directly.

  🚫 But here's the catch: Custom Components don't forward refs by default
  If you do something like this:

  function CustomInput() {
    return <input type="text" />;
  }

  function MyComponent() {
    const inputRef = useRef();

    return <CustomInput ref={inputRef} />;
  }

  This won’t work — because CustomInput is just a function, and React doesn’t pass the ref down unless you explicitly opt in.

  ✅ Enter: forwardRef
  Using React.forwardRef, you let refs pass through to a child component (usually a native DOM node like <input>).

  Let’s look at how your Input component might be used in practice with a ref.

  💡 Using Your Input Component With ref

  import React, { useRef } from "react";
  import Input from "./Input"; // your custom input

  function FormExample() {
    const myInputRef = useRef();

    const handleFocus = () => {
      myInputRef.current?.focus();  // calls DOM .focus()
    };

    return (
      <div className="p-4 space-y-4">
        <Input label="Name" placeholder="Enter your name" ref={myInputRef} />
        <button 
          onClick={handleFocus}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Focus the input
        </button>
      </div>
    );
  }
  
  🧪 What Happens Here:
  The ref={myInputRef} is passed to your custom <Input /> component.

  Inside your Input component, React.forwardRef makes sure this ref reaches the actual <input> element.

  When the button is clicked, it calls .focus() on the DOM node inside your component.
*/