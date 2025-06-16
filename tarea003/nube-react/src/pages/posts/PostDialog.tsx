import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../components/Button";
import { Dialog } from "../../components/Dialog";
import { Input } from "../../components/Input";
import { useContext } from "react";
import { useFirebaseUser } from "../../hooks/useFirebaseUser";
import { PostContext } from "./PostContext";
import { PostRepository } from "../../repositories/PostRepository";

type Inputs = {
  content: string;
};

export const PostDialog = () => {
  const { isDialogOpen, setIsDialogOpen, reloadFlag, setReloadFlag } = useContext(PostContext);
  const { user } = useFirebaseUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!user) {
      console.error("No user logged in");
      return;
    }
    await new PostRepository().addPost({
      content: data.content,
      userId: user.uid,
      userName: user.displayName || "Anonymous",
      createdAt: new Date(),
    });
    setIsDialogOpen(false);
    setReloadFlag(reloadFlag + 1);
    reset();
  };

  return (
    <Dialog
      isOpen={isDialogOpen}
      onClose={() => {
        setIsDialogOpen(false);
        reset();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Post Content"
          type="text"
          error={errors.content ? "This field is required" : ""}
          aria-invalid={errors.content ? "true" : "false"}
          {...register("content", { required: true })}
        />
        <div className="mt-4">
          <Button variant="primary" type="submit">
            Save Post
          </Button>
        </div>
      </form>
    </Dialog>
  );
};