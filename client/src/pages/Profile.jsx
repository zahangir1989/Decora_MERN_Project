import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null); // Update AuthContext
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <img
          src={user.avatar || "https://i.pravatar.cc/150"}
          alt="avatar"
          className="w-32 h-32 rounded-full border object-cover"
        />

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600 mt-2">{user.email}</p>
          <p className="text-gray-500 mt-1 text-sm">
            Member since: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-4 px-5 py-2  bg-red-600 hover:bg-red-700 text-white rounded transition"
          >
            Logout
          </button>
          {user.role === "admin" ? (
            <>
              <Link
                to={"/admin/dashboard"}
                className="mt-4 px-5 py-2  ml-4  bg-green-600 hover:bg-green-700 text-white rounded transition"
              >
                Admin Dashboard
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Optional: Additional profile info */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Profile Details</h3>
        <ul className="text-gray-700 space-y-1">
          <li>
            <strong>Name:</strong> {user.name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Role:</strong> {user.role || "User"}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
