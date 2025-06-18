import React from 'react'

function LoadingButton({children , type= "button", className}) {
  return (
    <button type={type} className={`px-2 py-1 rounded bg-[#4592a3] text-white ${className}`}>{children}</button>
  )
}

export default LoadingButton