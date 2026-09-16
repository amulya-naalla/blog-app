import React from 'react'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '@clerk/react'

function Articles() {
  const [articles,setArticles]=useState([])
  const [error,setError]=useState('')
  const navigate=useNavigate()
  const {getToken}=useAuth();

  async function getArticles(){
    const token=await getToken()
    let res=await axios.get('http://localhost:3000/author-api/articles',{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
    if(res.data.message=="articles"){
      setArticles(res.data.payload)
      setError('')
    }else{
      setError(res.data.message)
    }
  }

  function gotoArticleById(articleObj){
    navigate(`../${articleObj.articleId}`,{state:articleObj})
  }

  useEffect(()=>{
    getArticles()
  },[])

  return (
    <div className='container'>
      {error.length!=0 && <p className='display-4 text-center mt-5 text-danger'>{error}</p>}
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3'>
        {
          articles.map((articleObj)=><div className='col' key={articleObj.articleId}>
            <div className='card h-100'>
              <div className='card-body'>
                <div className='author-details text-end'>
                  <img src={articleObj.authorData.profileUrl} width="40px" className='rounded-circle' alt="" />
                  <p>
                    <small className='text-secondary'>{articleObj.authorData.nameOfAuthor}</small>
                  </p>
                </div>
                <h5 className='card-title'>{articleObj.title}</h5>
                <p className='card-text'>{articleObj.content.substring(0,80)+"..."}</p>
                <button className='custom-btn btn-4' onClick={()=>gotoArticleById(articleObj)}>Read more</button>
              </div>
              <div className='card-footer'>
                <small className='text-body-secondary'>Last updated on {articleObj.dateOfModification}</small>
              </div>
            </div>
          </div>

          )
        }
      </div>
    </div>
  )
}

export default Articles