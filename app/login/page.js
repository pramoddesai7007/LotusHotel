"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  faEye,
  faEyeSlash,
  faUser,
  fawhatsapp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import CounterLogin from "../counterLogin/page";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://lotusbackend.vercel.app/api/auth/login",
        { username, password }
      );
      // Handle successful login, save token to localStorage, redirect, etc.
      console.log(response.data);
      const token = response.data.token;

      localStorage.setItem("EmployeeAuthToken", token);
      setMessage("Login successful");
      router.push("/dashboard");
    } catch (error) {
      setMessage("Authentication failed");
    }
  };

  useEffect(() => {
    localStorage.removeItem("EmployeeAuthToken");
  }, []);
// Update your login logic to fetch the default section name and store it in local storage
useEffect(() => {
  const loginUser = async () => {
    try {
      // Your login logic here...
      
      // Upon successful login, fetch the default section name
      const response = await axios.get("https://lotusbackend.vercel.app/api/section/section/default");
      const defaultSectionName = response.data.name;

      // Store the default section name in local storage
      localStorage.setItem('defaultSectionName', defaultSectionName);

    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error if needed
    }
  };

  loginUser();
}, []);

  const [isOrderEnabled, setIsOrderEnabled] = useState(true);
  const handleToggle = () => {
    const newIsOrderEnabled = !isOrderEnabled;
    setIsOrderEnabled(newIsOrderEnabled);
    localStorage.setItem("isOrderEnabled", newIsOrderEnabled.toString());
    // Disable the toggle
    localStorage.setItem("disableToggle", "true");
  };
  


  // useEffect(() => {
  //   // Check if the toggle state is stored in localStorage
  //   const storedOrder = localStorage.getItem("isOrderEnabled");
  //   if (storedOrder !== null) {
  //     setIsOrderEnabled(storedOrder === "true");
  //   }
  // }, []);
  return (
    <>
      {isOrderEnabled ? (
        <div className="py-12 font-sans">
          <label htmlFor="toggle" className="flex items-center cursor-pointer absolute right-5">
            <div className="relative">
              <input
                type="checkbox"
                id="toggle"
                className="sr-only"
                checked={isOrderEnabled}
                onChange={handleToggle}
              />
              <div className="w-11 h-6 bg-blue-100 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full "></div>
              <div
                className={`absolute w-6 h-6 bg-blue-300 rounded-full shadow inset-y-0 left-0 ${
                  isOrderEnabled ? "translate-x-full" : "translate-x-0"
                }`}
              ></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">Order Login</div>
          </label>
          <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl mt-16">
            <div className="hidden lg:block lg:w-1/2 bg-cover text-center pl-18 mt-6">
              {/* Add your logo here */}
              <Image src="/myhotel.png" alt="logo" height={1200} width={1200} />
              <footer className="text-center text-black-500 text-xs md:text-sm mb-4 mt-5 mr-4">
                &copy; AB Software Solution. All rights reserved.
              </footer>
            </div>
            <div className="w-full p-3 lg:w-96 border-solid">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/ab.png"
                  alt="logo"
                  height={80}
                  width={80}
                  style={{ display: "block" }}
                />
              </div>
              <p className="text-2xl text-gray-600 text-center font-bold">
                Order Login
              </p>

              <div className="mt-4 relative">
                <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                  Username
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none pr-10 text-sm md:text-base"
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-4 relative">
                <label className="block text-gray-700 text-sm md:text-base font-semibold mb-2">
                  Password
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none pr-10 text-sm md:text-base"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 mt-8">
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="text-gray-500 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="mt-2 flex justify-end">
                <Link
                  href="/forgotPassword"
                  className="text-sm md:text-sm text-blue-500 mr-2"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="flex justify-center mt-1">
                <button
                  className=" bg-blue-100 text-blue-600 hover:bg-blue-200 text-gray font-semibold p-2 px-4 rounded-full mt-3 lg:w-full mx-auto"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

              {message && <p className="mt-4 text-red-500">{message}</p>}
              <footer className="text-center text-black-500 text-xs md:text-sm mb-4 mt-5">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>Branches: Pune | Satara | Kolhapur | Mumbai </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "3px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 448 512"
                      style={{ marginRight: "14px" }}
                    >
                      <path
                        d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6"
                        fill="green"
                        stroke="green"
                        strokeWidth="20"
                      />
                    </svg>
                    <span className="mr-2">
                      Contact Us: 8888732973 / 9699810037
                    </span>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        <CounterLogin />
      )}
    </>
  );
}
