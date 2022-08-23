import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom';

function Header() {
  return (
        <div id='header' className='p-5 w-screen flex justify-between items-center bg-mynavy'>
            <div>
              <Link to={"/login"}><Button type={"primary"}>Login</Button>  </Link>
            </div>
            <div><Link to={"/"}><h3 className='text-5xl text-white'>Kothin</h3></Link></div>
            <div>
                <Link to={"/signup"}><Button type={"primary"}>Signup</Button></Link>
            </div>
        </div>
    )
}

export default Header