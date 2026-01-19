// src/views/layouts/BaseLayout.jsx
'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/models/context/AuthContext";
import Header from "@/views/components/Header";
import Footer from "@/views/components/Footer";
import LoadingScreen from "@/views/components/LoadingScreen";

const BaseLayout = ({ children, title = "TechZone" }) => {
  const { user, isAdminOrStaff, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (title) {
      document.title = title;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title]);

  // Redirigir admin/staff a panel de administración
  useEffect(() => {
    if (!loading && user && isAdminOrStaff()) {
      console.log("🔒 Admin/Staff detectado en ruta pública, redirigiendo a /admin");
      router.push("/admin");
    }
  }, [user, loading, isAdminOrStaff, router]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;