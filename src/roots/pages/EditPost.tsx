import PostForms from '@/components/forms/PostForms';
import { useGetPostById } from '@/lib/react-query/queriesAndMutaions';
import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

const EditPost = () => {

  const {id} = useParams();
  const {data:post,isPending}  = useGetPostById(id || '');

  if(isPending) return <Loader/>
  console.log(id);

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className=" max-w-5xl flex-start justify-start  gap-3 w-full">
          <img
            src="/assets/icons/add-post.svg"
            alt="add"
            width={32}
            height={32}
          />
          <h2 className="h3-bold md:h2-bold">Create Post</h2>
        </div>
        <PostForms action = 'Update' post={post}/>
      </div>
    </div>
  );
};

export default EditPost;
