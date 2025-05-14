import React, {useCallback, useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PostForm = ({post}) => {
  const [previewImage, setPreviewImage] = useState(null);
  
  const {register, handleSubmit, watch, setValue, control, getValues, reset} = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      fileId: post?.featuredImage || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  // Reset form when post changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug || slugTransform(post.title),
        fileId: post.featuredImage,
        content: post.content,
        status: post.status
      });
    }
  }, [post, reset]);

  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate();

  const submit = async (data) => {
    // If Post already exists
    if(post) {
      const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null;

      if(file) {
        appwriteService.deleteFile(post.featuredImage)
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage
      })

      if(dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else { // If Post doesn't exists
      const file = await appwriteService.uploadFile(data.image[0]);

      if(file) {
        // const fileId = file.$id;
        // data.featuredImage = fileId;
        data.featuredImage = file.$id;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id
        })

        if(dbPost) {
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string') {
      return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')   // Remove invalid chars
      .replace(/\s+/g, '-')           // Collapse whitespace and replace by -
      .replace(/-+/g, '-')            // Collapse dashes
      .replace(/^-+|-+$/g, '');       // Trim dashes from start/end
    }

    return ''
  }, [])

  // Watch for title changes to update slug
  useEffect(() => {
    const subscription = watch((value, {name}) => {
      if(name === 'title') {
        setValue('slug', slugTransform(value.title), {shouldValidate: true});
      }
    })

    return () => {
      subscription.unsubscribe();
    }
  }, [watch, slugTransform, setValue])
  
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2 text-center">
        <Input
          label="Title: "
          placeholder="Title"
          className="mb-4"
          {...register("title", {required: true})}
        />

        <Input
          label="Slug: "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", {required: true})}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true});
          }}
        />

        <RTE 
          label="Content: "
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2 text-center">
        <Input
          label="Featured Image: "
          type="file"
          className="mb-4 file:mr-4 file:py-1 file:px-2 file:rounded file:border-1 file:text-sm file:text-black file:bg-gray-200 file:text-lg hover:file:bg-gray-100"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", {
            required: !post,
            onChange: (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewImage(reader.result);
                };
                reader.readAsDataURL(file);
              }
            }
          })}
        />

        {(previewImage || post) && (
          <div className="w-full mb-4">
            <img 
              src={previewImage || appwriteService.previewFile(post.featuredImage)}
              alt={post?.title || "Preview"}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", {required: true})}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full cursor-pointer"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  )
}

export default PostForm;

/*
  When the form is submitted:
  ---------------------------
  1. React Hook Form collects all registered input values.
  2. It validates them (if you added rules like {required: true}).
  3. If everything is valid, it calls your submit() function and automatically injects the data as an argument.
*/