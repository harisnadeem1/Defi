// src/components/PrivateRoute.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser"; // Or wherever you get Supabase user session

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser(); // You can use Supabase auth directly or custom hook
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/register");
    }
  }, [user, loading, navigate]);

  if (loading) return null; // or a loading spinner

  return user ? children : null;
};

export default PrivateRoute;
