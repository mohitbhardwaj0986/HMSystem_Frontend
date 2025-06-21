import React from 'react'

function Footer() {
  return (
  <footer className="bg-[#024D5C] text-white pt-10 pb-5">
  <div className="w-[95%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
    {/* Logo & About */}
    <div>
      <h1 className="text-2xl font-bold text-white">HMS</h1>
      <p className="text-sm mt-2">
        Your trusted healthcare partner, providing seamless online appointments, secure records, and compassionate care.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
      <ul className="space-y-2 text-sm">
        <li><a href="/" className="hover:text-[#27cbd3]">Home</a></li>
        <li><a href="/doctor" className="hover:text-[#27cbd3]">Take Appointment</a></li>
        <li><a href="/about" className="hover:text-[#27cbd3]">About Us</a></li>
        <li><a href="/profile" className="hover:text-[#27cbd3]">Profile</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h2 className="text-xl font-semibold mb-3">Contact</h2>
      <ul className="text-sm space-y-2">
        <li>Email: support@hms.com</li>
        <li>Phone: +91 9876543210</li>
        <li>Address: Ghaziabad, Uttar Pradesh</li>
      </ul>
    </div>

    {/* Social (Optional) */}
    <div>
      <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
      <div className="flex gap-4 text-xl">
        <a href="#" className="hover:text-[#27cbd3]"><i className="fab fa-facebook"></i></a>
        <a href="#" className="hover:text-[#27cbd3]"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-[#27cbd3]"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-[#27cbd3]"><i className="fab fa-linkedin"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="mt-10 border-t border-gray-600 pt-4 text-center text-sm">
    © {new Date().getFullYear()} HMS | All rights reserved.
  </div>
</footer>
  )
}

export default Footer