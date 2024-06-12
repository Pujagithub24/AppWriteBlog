import React from 'react'
import appwriteService from "../appwrite/conf"
import {Link} from 'react-router-dom'

//postcard ko display karane k liye we pass some props jo humko sidha ka sidha jab hum query lagayege toh humko
//appwrite se vapis mil jaayege
function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard