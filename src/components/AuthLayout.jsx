import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

//useEffect hi hume batayega ki aapko mujhe login pe bhejna hai ya homepage pe bhejna hai ya kya kaam
//karna hai , aur kis kis field mai kuch change hota hai toh mai dobara se checking karu ya nhi 
    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])
//user kahi se navigate hoke aaya hai , agar navigate mai kuch bhi change hua hai toh phir se run karo
//authStatus mai kuch change hua hai toh phir se run karo

  return loader ? <h1>Loading...</h1> : <>{children}</>
}