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
        <button
          onClick={handleLogout}
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100 transition"
        >
          Logout
        </button>
      </section>
    </div>
  );
}
