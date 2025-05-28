import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ProtectedRoute = ({ allowedRoles }) => {
  const { toast } = useToast();
  const [authChecked, setAuthChecked] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          variant: 'destructive',
          title: 'Authentication Required',
          description: 'Please log in to access this page.',
        });
        setAuthChecked(true);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        toast({
          variant: 'destructive',
          title: 'Authentication Required',
          description: 'Please log in to access this page.',
        });
        setAuthChecked(true);
        return;
      }

      const role = user.user_metadata?.role || 'user';
      setUserRole(role);
      setIsLoggedIn(true);
      setAuthChecked(true);
    };

    checkSession();
  }, []);

  useEffect(() => {
    if (authChecked && allowedRoles && !allowedRoles.includes(userRole)) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to view this page.',
      });
      setUnauthorized(true);
    }
  }, [authChecked, allowedRoles, userRole, toast]);

  if (!authChecked) return null; // Optional: add spinner
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (unauthorized) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
