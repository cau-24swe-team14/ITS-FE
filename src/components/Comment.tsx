import { useState } from 'react';
import { postComment } from '../apis/apis';

interface ICommentProps {
    projectId: number;
    issueId: number;
    onCommentPosted: (content: string) => void;
}

export default function Comment({ projectId, issueId, onCommentPosted }: ICommentProps) {
    const [content, setContent] = useState('');

    const handlePostComment = async () => {
        try {
            await postComment(projectId, issueId, { content });
            onCommentPosted(content);
            setContent('');
        } catch (error) {
            console.error('Failed to post comment:', error);
        }
    };
    
    return(
        <div className="flex flex-col mx-[171px] mb-[81px] w-[1098px] h-[302px]">
            <div className="text-[24px] font-semibold">Comment</div>
            <div className="mt-[16px] w-[1098px] h-[257px] bg-[#D9D9D9] rounded-[5px] relative">
                <textarea
                    className="mx-[33px] my-[34px] w-[1032px] h-[188px] resize-none p-4 rounded-[5px]"
                    placeholder="댓글 작성"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button
                    className="absolute bottom-[40px] right-[40px] w-[180px] bg-black text-white font-bold rounded-lg hover:bg-[#747474]"
                    type="button"
                    onClick={handlePostComment}
                    >Post
                </button>
            </div>
        </div>
    );
}