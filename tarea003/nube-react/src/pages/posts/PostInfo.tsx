import { Trash } from "react-bootstrap-icons";
import Button from "../../components/Button";
import Card from "../../components/Card";
import type { Post } from "./Post";
import { PostRepository } from "../../repositories/PostRepository";

type Props = {
  post: Post;
  onDeleteCallback: () => void;
};

export const PostInfo = ({ post, onDeleteCallback }: Props) => {
  const onPostDeleteClick = () => {
    new PostRepository().deletePost(post.id!);
    onDeleteCallback();
  };

  return (
    <Card className="my-3" title={`Post by ${post.userName}`}>
      <div className="text-gray-700 mb-3">
        <p>{post.content}</p>
        {post.createdAt && (
          <p>
            <strong>Created:</strong> {post.createdAt.toLocaleString()}
          </p>
        )}
        <div className="mt-2">
          <Button onClick={onPostDeleteClick} variant="danger">
            <Trash size={12} />
          </Button>
        </div>
      </div>
    </Card>
  );
};