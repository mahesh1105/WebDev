import React, {useEffect, useState} from "react";
import { Container, PostCard } from "../components";
import appwriteService from '../appwrite/config'
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);

  // useSelector will take the callback, and its parameter have access of the state
  const userAuthStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
			if(posts) {
				setPosts(posts.documents);
			}
		})
  }, [])

  if(posts.length === 0 && userAuthStatus === true) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-500 hover:text-gray-800">
                Create Post to get started
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  if(!userAuthStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-500 hover:text-gray-800">
                Login to read the posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard 
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home;