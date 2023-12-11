import Link from 'next/link';
import React from 'react';

export default function Custom404() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="rounded-lg bg-white p-8 shadow-xl">
        <h1 className="mb-4 text-4xl font-bold text-center">404</h1>
        <p className="text-gray-600 text-center">Oops! The page you are looking for could not be found.</p>
        <Link href="/" className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
