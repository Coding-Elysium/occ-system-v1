import React from 'react'

const ButtonCancel = ({
    buttonText = "Cancel",
    onClick

}) => {
  return (
    <button
        className='py-2 px-6 border border-gray-300 text-black rounded-md font-semibold cursor-pointer' 
        onClick={onClick}
    >{buttonText}</button>
  )
}

export default ButtonCancel