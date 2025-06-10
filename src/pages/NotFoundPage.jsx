// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] w-full flex-col items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold black md:text-9xl">404</h1>
        <p className="mt-4 text-2xl font-semibold tracking-tight text-gray-900 md:text-3xl">
          Halaman Tidak Ditemukan
        </p>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari.
        </p>
        
      </div>
    </main>
  );
};

export default NotFoundPage;
