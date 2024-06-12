import React from 'react'
//yeh editor jo tinymce humne install kiya tha vaha se mila hai
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';


//yeh control hi react-hook-form se aata hai aur yhi control responsible hai iski saari state vagerah 
//ko uss from mai le jaane k liye
//yeh control kaha se pass karenge ? jab iss rte ko hum use karenge vaha pe 
export default function RTE({name, control, label, defaultValue =""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}
     //iss field k andar agar kuch bhi change hota hai toh mujhe inform kar dena render k saath
    render={({field: {onChange}}) => (
     //yaha jo bhi element humko render karvana hai 
      <Editor
        apiKey='2nne9rzzaoirhjp24rpi5ruw4c6l5bsqtiwz6lmdw83nvj6a'
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
         //editor mai kuch bhi change ho field jo hai voh humare govern ho rahe hai onChange se
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}