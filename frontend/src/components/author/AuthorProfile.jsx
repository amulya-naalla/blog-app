import React from 'react'
import { NavLink,Outlet } from 'react-router-dom'

function AuthorProfile(){
  return (
    <div className='author-profile'>
      <ul className='d-flex list-unstyled justify-content-around fs-4'>
        <li><NavLink to="articles" className="nav-link">Articles</NavLink></li>
        <li><NavLink to="article" className="nav-link">Add new Article</NavLink></li>
      </ul>
      <div className='mt-5'><Outlet /></div>
    </div>
  )
}

export default AuthorProfile