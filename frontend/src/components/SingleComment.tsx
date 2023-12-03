import { Avatar } from '@nextui-org/react';
import { Comment } from '../../../src/handlers/comments/entities/comment.entity';

export const SingleComment = ({ comment }: { comment: Comment }) => {
  return (
    <div
      key={comment.id}
      className="flex flex-col mb-5 bg-gray-50 p-3 rounded-lg"
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-5">
          <div className="flex gap-2">
            <Avatar src={comment?.user?.avatar_image} size="md" />
            <div className="flex flex-col">
              <p className="text-base md:text-lg">
                {comment.user.first_name} {comment.user.last_name}
              </p>
              <p className="text-base italic">
                {new Date(comment.created_at).toLocaleTimeString('hr-HR')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <p className="text-base md:text-lg">{comment.content}</p>
    </div>
  );
};
