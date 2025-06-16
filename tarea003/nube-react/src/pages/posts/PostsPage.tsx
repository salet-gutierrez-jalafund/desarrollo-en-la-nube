import { Container } from "../../components/Container";
import Menu from "../../components/Menu";
import Button from "../../components/Button";
import { PostDialog } from "./PostDialog";
import { PostList } from "./PostList";
import { useState } from "react";
import { PostContext } from "./PostContext";

const PostsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(0);

  const onAddPostClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Menu />
      <PostContext.Provider
        value={{
          reloadFlag,
          setReloadFlag,
          isDialogOpen,
          setIsDialogOpen,
        }}
      >
        <Container>
          <div className="flex justify-between items-center mb-4 mt-4">
            <h1 className="text-2xl mt-2 mb-2">Posts</h1>
            <Button onClick={onAddPostClick}>Add Post</Button>
          </div>
          <PostList />
        </Container>
        <PostDialog />
      </PostContext.Provider>
    </>
  );
};

export default PostsPage;