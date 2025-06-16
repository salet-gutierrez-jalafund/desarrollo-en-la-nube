import { useCallback, useContext, useEffect, useState } from "react";
import type { Post } from "./Post";
import { PostInfo } from "./PostInfo";
import { PostRepository } from "../../repositories/PostRepository";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { PostContext } from "./PostContext";

export const PostList = () => {
  const { user } = useFirebaseUser();
  const { reloadFlag, setReloadFlag } = useContext(PostContext);
  const [posts, setPosts] = useState<Post[]>([]);

  const loadPosts = useCallback(async () => {
    if (!user) return;
    const thePosts = await new PostRepository().getPostsByUserId(user.uid);
    setPosts(thePosts);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    loadPosts();
  }, [user, loadPosts, reloadFlag]);

  const onPostDeleteCallback = () => {
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <>
      {posts.map((post) => (
        <PostInfo
          post={post}
          key={post.id}
          onDeleteCallback={onPostDeleteCallback}
        />
      ))}
    </>
  );
};