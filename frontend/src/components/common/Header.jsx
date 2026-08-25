import {useContext} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useClerk,useUser } from '@clerk/react'
import { userAuthorContextObj } from '../../contexts/UserAuthorContext'

function Header() {
  const {signOut}=useClerk()
  const {isSignedIn,user,isLoaded}=useUser()
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const navigate=useNavigate()

  async function handleSignout() {
    await signOut()
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div>
      <nav className="header d-flex justify-content-between align-items-center">
        <div>
          <Link to='/'>LOGO</Link>
        </div> 
        <ul className='d-flex list-unstyled justify-content-around header-links'>
          {
            !isSignedIn?
            <>
              <li>
                <Link to=''>Home</Link>
              </li>
              <li>
                <Link to='signin'>Signin</Link>
              </li> 
              <li>
                <Link to='signup'>Signup</Link>
              </li>
            </>:
            <div className='user-button'>
              <div style={{position:'relative'}}>
                <img src={user.imageUrl} width='40px' className='rounded-circle' alt="" />
                <p className='role' style={{position:'absolute',top:"0px",right:"-20px"}}>{currentUser.role}</p>
              </div>
              <p className='mb-0 user-name'>{user.firstName}</p>
              <button className="btn btn-danger signout-btn" onClick={handleSignout}>Signout</button>
            </div>
          }
          
      </ul>
      </nav>
    </div>
  )
}

export default Header