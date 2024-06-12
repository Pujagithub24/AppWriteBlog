import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/conf";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
        //edit karna hai user click karega phir uss page pe jaayega toh humare pass url pe available hoga
    //url se kuch bhi value nikaalne k liye we use setParams
    const {slug} = useParams()
    const navigate = useNavigate()

    //saari data values leke aani hai , slug se hi values aayegi , we use useEffect 
//slug mai koi bhi change ho toh data value leke aao
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    //slug aur navigate dono mai se kuch bhi change ho toh dobara run kijiye

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost