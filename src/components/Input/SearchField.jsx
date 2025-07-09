import React from 'react'
import { FaSearch } from 'react-icons/fa'

const SearchField = ({onchange}) => {
  return (
    <div className="relative w-96 flex-shrink-0">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FaSearch />
        </span>
        <input
            onChange={onchange}
            type="text"
            placeholder="Search..."
            className=" w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>
  )
}

export default SearchField