import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { userSuccess } from "../slice/user";
import { useDispatch } from "react-redux";
const Users = () => {
  const [data,setdata] = useState([]);
  const dispatch = useDispatch();
  const allUser = useSelector((state) => state.users.allUsers);
  const token = useSelector((state) => state.register.token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/api/v1/user/getall",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          // If the response is not 2xx, we get the error response
          const errorResponse = await response.json();
          console.log(errorResponse);
          toast.error("Error fetching user data. Please try again.", {
            duration: 4000,
            position: "top-center",
          });
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const mydata = await response.json();
      console.log(mydata);
       
       await setdata(mydata.users);
        console.log(mydata.users);
        localStorage.setItem("admin_user", JSON.stringify(mydata.users))
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    if (localStorage.getItem("admin_user")) {
      setdata(JSON.parse(localStorage.getItem("admin_user")))
    }

    fetchData()
  }, []); // The empty array ensures this effect runs only once after the initial render

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col bg-black">
      <div className="w-[80%] flex-col flex ">
      {data.length > 0 ? (
          data.map((user) => (
            <React.Fragment key={user._id}>
              <div className="w-[100%] h-20 flex items-center justify-between p-10 bg-white rounded-3xl m-4">
                <h1>{user.name}</h1>
                <button
                  className="bg-black text-white p-2 w-24 rounded-full"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          ))
        ) : (
          <p>No users found.</p>
        )}
        
      </div>
    </div>
  );
};

export default Users;
