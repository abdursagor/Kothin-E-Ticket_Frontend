import React from 'react'
import { Link } from 'react-router-dom';

function Card({children, to, ...rest}) {
  return (
      <Link to={to}>
          <div className='w-56 h-32 bg-mynavy hover:bg-[#1d5893] rounded-2xl flex justify-end items-end p-5'>
              <p className='text-lg text-white'>{children}</p>
          </div>
    </Link>
  )
}

export default Card