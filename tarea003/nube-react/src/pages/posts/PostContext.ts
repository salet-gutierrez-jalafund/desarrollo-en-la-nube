import { createContext } from "react";

type PostContextType = {
  reloadFlag: number;
  setReloadFlag: (flag: number) => void;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
};

export const PostContext = createContext<PostContextType>({
  reloadFlag: 0,
  setReloadFlag: () => {},
  isDialogOpen: false,
  setIsDialogOpen: () => {},
});