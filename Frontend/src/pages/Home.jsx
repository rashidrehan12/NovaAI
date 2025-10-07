import React from "react";
import AnimatedBtn from "../components/AnimatedBtn/AnimatedBtn";
import ai from "/ai.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <div className="absolute w-full flex flex-row justify-between items-center top-5 !px-4 sm:!px-7">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl uppercase font-bold bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] bg-clip-text text-transparent">
            Nova
          </h1>
          <img src={ai} alt="Nova" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div className="flex gap-4 sm:gap-7">
          <Link to="/login">
            <AnimatedBtn>Login</AnimatedBtn>
          </Link>
          <Link to="/register">
            <AnimatedBtn>Register</AnimatedBtn>
          </Link>
        </div>
      </div>
      <div className="main-content !pt-32 sm:!pt-10 min-h-screen flex flex-col gap-5 items-center justify-center !px-4">
        <h1
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center font-bold uppercase bg-gradient-to-r from-[#3c6e71] via-white to-[#3c6e71] 
  bg-clip-text text-transparent"
        >
          Hello, I'm Nova{" "}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center">
          Your intelligent AI companion for every conversation
        </p>
        <div>
          <Link to="/register">
            <AnimatedBtn>Explore Nova</AnimatedBtn>
          </Link>
        </div>
        <div className="w-full !mt-10 features flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 !mb-10">
          <div className="w-[90%] sm:w-80 !p-5 backdrop-blur-2xl shadow-md shadow-[#549295] rounded-xl flex flex-col gap-3">
            <h2 className="text-2xl text-center font-bold text-white">
              🧠 Natural Chat
            </h2>
            <p className="text-gray-300 text-center">
              AI that understands context and responds naturally
            </p>
          </div>
          <div className="w-[90%] sm:w-80 !p-5 backdrop-blur-2xl shadow-md shadow-[#549295] rounded-xl flex flex-col gap-3">
            <h2 className="text-2xl text-center font-bold text-white">
              ⚡ Lightning Fast
            </h2>
            <p className="text-gray-300 text-center">
              Instant responses with cutting-edge technology
            </p>
          </div>
          <div className="w-[90%] sm:w-80 !p-5 backdrop-blur-2xl shadow-md shadow-[#549295] rounded-xl flex flex-col gap-3">
            <h2 className="text-2xl text-center font-bold text-white">
              🔐 Secure & Private
            </h2>
            <p className="text-gray-300 text-center">
              Your conversations stay confidential and protected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
