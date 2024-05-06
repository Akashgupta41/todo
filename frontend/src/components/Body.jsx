import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Todo from './Todo'
import Nav from "./Nav";


const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path:'*',
      element:<Nav/>
  },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
  ]);
  return (
    <div>
      
      <RouterProvider router={appRouter} >
    
      </RouterProvider>
    </div>
  );
};

export default Body;
