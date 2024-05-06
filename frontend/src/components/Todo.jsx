import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import toast, { Toaster } from "react-hot-toast";
const Todo = () => {
  const [todo, setTodo] = useState();
  const [alltodo, setAlltodo] = useState();
  const [task, setTask] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/api/v1/task/getall",
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

        console.log(mydata.AllTask);
        setTask(mydata.AllTask);
        console.log(task);
        localStorage.setItem("todo", JSON.stringify(mydata.AllTask));
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    if (localStorage.getItem("todo")) {
      setTask(JSON.parse(localStorage.getItem("todo")));
    }
    fetchData();
  }, []);
  console.log(task);
  const handlePost = async (e) => {
    const mydata = {
      todo: todo,
    };
    e.preventDefault();
    const fethdata = await fetch("http://localhost:6969/api/v1/task/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(mydata),
    });
    if (fethdata.ok) {
      const res = await fethdata.json();
      console.log(res);
      setTodo("");
    }
  };
  return (
    <div>
      <Toaster />
      <form className="m-40">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="text"
            id="search"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Add Todo"
            required
          />
          <button
            onClick={(e) => {
              handlePost(e);
            }}
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add Todo
          </button>
        </div>
      </form>
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl mb-20">ALL TODOS</h1>
          {task.length > 0 ? (
            task.map((user) => (
              <React.Fragment key={user._id}>
                <div className="flex items-center justify-between w-[60%] border-1 border-black border rounded-lg bg-slate-800 text-white h-20 p-10 m-4 ">
                  <h1 className="ml-10">{user.todo}</h1>
                  <div>
                    <button className="m-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>
                    <button className="m-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))
          ) : (
            <p>No Todos Found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todo;
