import { createContext, useEffect, useState } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.get(
  //         "http://localhost:5000/api/v1/auth/me",
  //         { withCredentials: true }
  //       );
  //       setUser(res.data.user);
  //     } catch {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/auth/me", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
