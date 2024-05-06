import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  registerRequest,
  registerFailure,
  registerSuccess,
} from "../slice/auth";
export default function Login() {
  const [email,setEmail] = useState("");
  const [password ,setPassword] = useState("");
const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.register.user);
  const isLogged = useSelector((state) => state.register.isLogged);
  const error = useSelector((state) => state.register.error);
  const message = useSelector((state) => state.register.message);

  const handleSubmit = async (e) => {
    const payload = {
      email:email,
      password:password
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:6969/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        // If the response is not 2xx, throw an error
        console.log(response);
        toast.success("Register error Please try Again", {
          duration: 4000,
          position: "top-center",
          // Styling
          style: {},
          // Custom Icon
          icon: "👏",
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      console.log(data.message);
      console.log(data.payload);
      // Dispatch success action with the received data
      const userdata = {
        message: data.message,
        token: data.token,
        name: data.payload.name,
        email: data.payload.email,
        id: data.payload.id,
        isAdmin: data.payload.isAdmin,
        isLogged:true
      };
      

      dispatch(registerSuccess(userdata));
      localStorage.setItem("token", userdata.token);
      localStorage.setItem("user", JSON.stringify(userdata));
      toast.success(`Welcome ${userdata.name}`);
      navigate("/");
    } catch (error) {
      console.error(
        "There was a problem with the fetch operation:",
        error.message
      );
      // Dispatch failure action with the error message
      dispatch(registerFailure(error.message));
    }
  };



  console.log(localStorage.getItem("user"));
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <form
        onSubmit={(e)=>{handleSubmit(e)}}
        className="w-[50%] flex items-center flex-col  border-2 border-gray-600 bg-cyan-800 text-white rounded-xl p-40"
      >
        <div className="flex mb-5">
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          <h1 className="text-2xl font-bold">
          Login Here ..
          </h1>
        </div>
        <input
          type="text"
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder="Please Enter Your Email"
          className="w-[100%] p-4 m-2 border-1 border-black text-black bg-gray-100 rounded-full outline-none "
        />
        <input
         value={password}
         onChange={(e)=>{setPassword(e.target.value)}}
          type="text"
          placeholder="Please Enter Password"
          className="w-[100%] p-4 m-2 border-1 border-black text-black bg-gray-100 rounded-full outline-none "
        />
        <div className="flex">
          <p>Not Have an acount ? </p>
          <Link to={"/register"}>
            <h1 className="text-blue-500">create A Acount</h1>
          </Link>
        </div>
        <button className="bg-white w-56 h-15 p-2 text-black rounded-full m-8">
          Login
        </button>
      </form>
    </div>
  );
}
