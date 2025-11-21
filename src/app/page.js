"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  // Fetch user profile
  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.profile) setUser(data.profile);
    }
    fetchProfile();
  }, []);

  // Logout function
  async function handleLogout() {
    await fetch("/api/auth/logout");
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 flex flex-col">
      
      {/* Navbar */}
      <nav className="w-full bg-white bg-opacity-20 backdrop-blur-md px-8 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-bold text-white">MyApp</h1>
        <div>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-white text-purple-600 font-semibold px-4 py-2 rounded-md hover:bg-purple-100 transition"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Welcome {user ? `${user.first_name} ${user.last_name}` : "!"}
        </h2>
        <p className="text-white text-lg md:text-xl mb-6">
          {user ? `Your email: ${user.email}` : "Loading your profile..."}
        </p>
        
        {/* <button
          onClick={handleLogout}
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100 transition"
        >
          Logout
        </button> */}
        <div className="px-4 sm:px-10 py-6">
      <div className="max-w-screen-xl max-lg:max-w-3xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-x-12 gap-y-16">
          <div className="max-lg:text-center">
            <h1 className="md:text-5xl text-4xl !leading-tight font-bold text-slate-900 mb-6">Experience Future of Dining with AI</h1>
            <p className="text-base text-slate-600 leading-relaxed">Discover a smarter way to order, crafted by artificial intelligence. From personalized menu suggestions to lightning-fast delivery, enjoy a dining experience designed just for you.</p>

            <div className="mt-12 flex flex-wrap max-lg:justify-center gap-4">
              <a href="javascript:void(0);" className="px-6 py-3 text-base font-semibold text-white border border-violet-600 bg-violet-600 hover:bg-violet-700 rounded-full transition-all focus:outline-none">Explore Our Menu</a>
              <a href="javascript:void(0);" className="px-6 py-3 text-base font-semibold text-violet-700 border border-violet-600 rounded-full hover:bg-gray-100 transition-all focus:outline-none">Order Now</a>
            </div>
          </div>
          <div className="w-full aspect-[12/9]">
            <img src="https://readymadeui.com/images/ai-img1.webp" className="w-full h-full object-cover rounded-lg shadow-xl" alt="hero-img" />
          </div>
        </div>
      </div>
    </div>
      </section>
    </div>
  );
}
