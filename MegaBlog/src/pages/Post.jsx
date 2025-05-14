import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom'
import appwriteService from '../appwrite/config'
import { Button, Container } from "../components";
import parse from 'html-react-parser'
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    console.log('userData:', userData);  // Log userData here to check if it's available
    if(slug) {
      appwriteService.getPost(slug).then((post) => {
        if(post) setPost(post);
        else navigate('/');
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);

  // Check if both post and userData are available
  const canEditOrDelete = post && userData && post.userId === userData.$id;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if(status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate('/');
      }
    });
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border-white border-1 rounded-xl p-2">
          <img
            src={appwriteService.previewFile(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />

          { canEditOrDelete && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="mr-3 cursor-pointer"
                >
                  Edit
                </Button>
              </Link>

              <Button
                bgColor="bg-red-500"
                onClick={deletePost}
                className="mr-3 cursor-pointer"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold text-center">
            {post.title}
          </h1>
        </div>

        <div className="browser-css text-center">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;