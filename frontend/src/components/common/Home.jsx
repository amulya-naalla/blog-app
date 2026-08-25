import { useContext,useEffect  } from "react"
import { userAuthorContextObj } from "../../contexts/UserAuthorContext"
import { useUser } from "@clerk/react"
import  axios from "axios"

function Home() {
  const {currentUser,setCurrentUser}=useContext(userAuthorContextObj)
  const {isSignedIn,user,isLoaded}=useUser()
  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.emailAddresses[0].emailAddress,
      profileImgUrl:user?.imageUrl
    })
   },[isLoaded])

  async function onSelectRole(e){
    const selectedRole=e.target.value 
    currentUser.role=selectedRole
    let res=null 
    if(selectedRole=="author"){
      res=await axios.post('http://localhost:3000/author-api/author',currentUser)
      let {message,payload}=res.data
      if(message=="author"){
        setCurrentUser({...currentUser,...payload})
      }
    }
    if(selectedRole=="user"){
      res=await axios.post('http://localhost:3000/user-api/author',currentUser)
      let {message,payload}=res.data
      if(message=="user"){
        setCurrentUser({...currentUser,...payload})
      }
    }
  }

  return (
    <div className="container">
      {
        isSignedIn===false  && <div>
          <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, ea!</p>
          <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, ea!</p>
          <p className="lead">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime, ea!</p>
        </div>
      }
      {
        isSignedIn===true  && 
        <div>
        <div className="d-flex align-items-center justify-content-evenly bg-info p-3">
          <img src={user.imageUrl} width="100px" className="rounded-circle" alt="" />
          <p className="display-6">{user.firstName}</p>
        </div>
        <p className="lead">Select role</p> 
        <div className="d-flex role-radio py-3 justify-content-center">
        
            <div className="form-check me-4">
              <input type="radio" name="role" id="author" value="author" className="form-check-input" onClick={onSelectRole}/>
              <label htmlFor="author" className="form-check-label">Author</label>
            </div>
            <div className="form-check">
              <input type="radio" name="role" id="user" value="user" className="form-check-input" onClick={onSelectRole}/>
              <label htmlFor="user" className="form-check-label">User</label>
            </div>
        </div>
        </div>
        

      }
    </div>
  )
}

export default Home