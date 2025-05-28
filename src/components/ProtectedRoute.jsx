import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

const ProtectedRoute = ({ allowedRoles }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { toast } = useToast();

  if (!currentUser) {
    toast({ variant: "destructive", title: "Authentication Required", description: "Please log in to access this page." });
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    toast({ variant: "destructive", title: "Access Denied", description: "You do not have permission to view this page." });
    return <Navigate to="/" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;