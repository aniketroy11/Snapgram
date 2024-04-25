import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutaions";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation();
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending:isSavingPost } = useSavePost();
  const { mutate: deleteSavePost , isPending:isDeletingSaved} = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let likesArray = [...likes];

    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId);
    } else {
      likesArray.push(userId);
    }

    setLikes(likesArray);
    likePost({ postId: post.$id, likesArray });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      return deleteSavePost(savedPostRecord.$id);
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div className="flex justify-between items-center ">
      <div className="flex gap-1">
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={25}
          height={25}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="text-lg">{likes.length}</p>
      </div>
      <div className="flex gap-1 ">
        {
          isSavingPost || isDeletingSaved ? 
          <Loader/>
          :
          <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="save"
          width={25}
          height={25}
          onClick={handleSavePost}
          className="cursor-pointer"
        />
        }
      </div>
    </div>
  );
};

export default PostStats;
