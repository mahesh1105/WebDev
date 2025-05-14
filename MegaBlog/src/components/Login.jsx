import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../features/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from 'react-hook-form'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError('');
    try {
      // Call the login method for User Login
      const session = await authService.login(data);

      // If User Login is successful
      if(session) {
        // Get the details for current logged in user
        const userData = await authService.getCurrentUser();

        // If userData is there, then call login method from feature slice and update the state in store by calling the method
        if(userData) {
          console.log("Logging in user:", userData);  // Log userData to see if it's being fetchedconsole.log("Logging in user:", userData);  // Log userData to see if it's being fetched
          dispatch(authLogin(userData))
        }

        // After User is logged in - navigate to next page
        navigate('/');
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] text-center">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have an account? &nbsp;
          <Link
            to='/signup'
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && 
          <p className="text-red-500 mt-8 text-center">
            {error}
          </p>
        }

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 text-center">
            <Input 
              label="Email: "
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) => (
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be valid"
                  )
                }
              })}
            />

            <Input 
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />

            <Button 
              type="submit"
              className="w-full cursor-pointer"
            >
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;