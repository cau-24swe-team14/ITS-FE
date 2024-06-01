import profile from "../assets/profile.png";

export interface ICommentListProps {
    comments: ICommentProps[];
}

export interface ICommentProps {
    id: number;
    username: string;
    content: string;
    date:string
}

export default function CommentList({ comments }: ICommentListProps) {
    const safeComments = comments || [];

    return(
        <div className="flex flex-col mx-[171px] mb-[100px] w-[1098px]">
            <div className="text-[24px] font-semibold">Comment List</div>
            {safeComments.length === 0 ? (
                <div className="my-[20px]">
                    <div className="border border-[#D9D9D9]" />
                    <div className="mx-[20px] my-[20px] font-semibold text-[18px]">No comment</div>
                </div>
            ) : (
                safeComments.map(comment => (
                    <div key={comment.id} >
                        <div className="flex flex-row mt-[27px]">
                            <img src={profile} alt="프로필" className="w-[60px] h-[60px] mx-[20px] flex items-center justify-center"></img>
                        <div className="flex flex-col">
                            <div className="font-semibold text-[20px]"> {comment.username}</div>
                            <div>{comment.date}</div>
                        </div>
                        </div>
                        <div className="mx-[20px] my-[30px] font-normal text-[24px]">{comment.content}</div>
                        <hr className="border border-gray" />
                    </div>
                ))
            )}
        </div>
    );
}
