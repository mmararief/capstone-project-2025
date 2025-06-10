// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // 1. Cek apakah ada token otentikasi di localStorage
  const isLoggedIn = !!localStorage.getItem('authToken');

  // 2. Jika tidak login, arahkan (redirect) pengguna ke halaman login
  if (!isLoggedIn) {
    // 'replace' digunakan agar pengguna tidak bisa menekan tombol "kembali" di browser
    // dan kembali ke halaman yang dilindungi setelah di-redirect.
    return <Navigate to="/login" replace />;
  }

  // 3. Jika sudah login, tampilkan halaman yang seharusnya (children)
  return children;
};

export default PrivateRoute;