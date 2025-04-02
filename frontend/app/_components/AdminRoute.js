// components/AdminRoute.js
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.replace("/unauthorized"); // Redirect if not admin
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null; // or spinner

  return children;
};

export default AdminRoute;
