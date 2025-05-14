import React from "react";
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

// Here id will be taken as $id as per the appwrite
const PostCard = ({$id, title, featuredImage}) => {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          {featuredImage && (
            <img 
              src={appwriteService.previewFile(featuredImage)}
              alt={title}
              className="rounded-xl"
            />
          )}
        </div>
        <h2 className="text-xl font-bold">
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard;

/*
  This Component is used to show the Cards at home page after the creation of posts
*/