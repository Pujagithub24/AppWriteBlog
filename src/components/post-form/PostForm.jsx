import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/conf";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
//kisi field ko agar humko continuously monitor karna ho toh humko watch capabilities bhi deta hai
//kisi bhi field k andar agar value set karni ho toh -> setvalue
//control -> agar kisi form ka humko control chahiye ho toh we get direct control yeh control hum direct
//RTE mai pass karenge as it is toh vaha se jo bhi syntax ya hai voh sab control humko mil jaayega
//getValue -> to grab values from the form
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
                 //agar post hai to title use kar lijiye nhi toh empty rakh lijiye
            title: post?.title || "",
            slug: post?.$id || "",
                     //post k andar content hai use karlo nhi toh empty
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        //post upload kardi humne
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

 //purani image delete bhi toh karni padegi
  //agar file upload ho gai hai toh data ka deletion operation chala do
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
  //file upload aur delete ho gai hai 
 //abb update bhi toh karna hoga
   //post.$id se slug milega
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                 //featuredImage ko esse set karo ki agar file hai toh file ki id featuredImage ko dedo
                featuredImage: file ? file.$id : undefined,
                   //agar db post successfully aa gaya hai toh user ko navigate bhi kara do
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        } 
          //agar post nhi hai toh
         //means user ek naya form create karna chahta hai 
        else {
             //pehle upload karenge
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                 //we create an object and spread out becoz humare pass jo actually forms banenge
             //vaha kabhi bhi humare pass user data nhi hoga
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

//we have two input field title and slug (title ko watch karna hai aur slug k andar value generate 
//karni hai) , agar user kahi bhi space deta hai toh usko convert karna hai dash mai
    const slugTransform = useCallback((value) => {
 //jab bhi slug transform karenge value toh pass karenge hi , if the value is there
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return ""; //return an empty string
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
    //slug k andar value set karni hai , slugTransform se jo value milegi voh iss slug mai send
    //karni hai -> value obj hai , uski title value li hai humne (value.title)
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
             {/*form ka left part 2/3 le raha hai*/}
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
             {/*bacha hua part 1/3 le raha hai*/}
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}