import React from "react";

const Container = ({children}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
        {children}
    </div>
  )
}

export default Container;

/*
  This React Component is a layout utility - it acts as a reusbale wrapper to center and constrain the width of the app.

  It’s a functional component that takes children as a prop. 
  This means you can wrap other components or JSX inside it, and they’ll be injected where {children} is placed.

  Point: Component can be rendered directly without passing it to Container function
  But for maintaining the consistency across all the components, we are wrapping all of them in Generic Container
  So that same styling can be maintained across all the components
*/