import React from 'react'

const Button = ({
    buttonText = "Button",
    onClick

}) => {
  return (
    <button
        className='py-2 px-6 bg-primary-color text-white rounded-md font-semibold cursor-pointer hover:bg-primary-color-hover' 
        onClick={onClick}
    >{buttonText}</button>
  )
}

export default Button