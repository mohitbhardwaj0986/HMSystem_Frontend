import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PagenotFound() {
  return (
    <motion.div
      className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#bcfcff] to-[#f5ffff] text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-7xl font-bold text-[#024D5C] mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-6">Oops! Page not found</p>
      <p className="text-gray-500 mb-8">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-[#024D5C] text-white px-6 py-3 rounded-full hover:bg-[#013f4a] transition-all"
      >
        Go back home
      </Link>
    </motion.div>
  )
}

export default PagenotFound