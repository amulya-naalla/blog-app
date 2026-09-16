import React from 'react'
import { NavLink } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

function UserProfile(){
  return (
    <div className='author-profile'>
      <ul className='d-flex list-unstyled justify-content-around fs-4'>
        <li><NavLink to="articles" className="nav-link">Articles</NavLink></li>
      </ul>
      <div className='mt-5'><Outlet /></div>
    </div>
  )
}

export default UserProfile