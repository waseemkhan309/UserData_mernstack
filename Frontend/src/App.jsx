import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [inputData, setInputData] = useState(''); /* useState('')*/
  const [usersdata, setUsersdata] = useState([]);

  const handleChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(inputData);
    // Add your form submission logic here
    const res = await fetch("http://localhost:8080/demo", {
      method: "POST",
      body: JSON.stringify(inputData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };

  // Make fetch request one more
  const getUsers = async () => {
    const res = await fetch("http://localhost:8080/demo", {
      method: "GET",
    });
    const data = await res.json();
    setUsersdata(data);
  };

  // call getUsers by useEffect hook
  useEffect(() => {
    getUsers();
  }, [usersdata]);

  return (
    <div className="bg-white  ">
      <div className="flex min-h-full bg-gray-300 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Enter Username and Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
            action="#"
            method="POST"
          >
            {/* <h1>{ JSON.stringify(inputData)}</h1> */}
            <div>
              <label
                htmlFor="uname"
                className="block text-sm text-left font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="uname"
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-gray-200 pb-5 ">
      <h2 className="text-2xl font-bold text-left ">User Data From Database</h2>
        <ul>
          {usersdata.map((data) => (
            <li key={data._id} >
                <div className="min-w-0 flex-auto ">
                  <p className="text-sm font-semibold leading-7 text-gray-900">
                    {data.username}
                  </p>
                  <p className=" truncate text-xs leading-5 text-gray-500">
                    {data.password}
                  </p>
                </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
