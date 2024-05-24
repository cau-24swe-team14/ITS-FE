
export default function Comment() {
    return(
        <div className="flex flex-col mx-[171px] mb-[81px] w-[1098px] h-[302px]">
            <div className="text-[24px] font-semibold">Comment</div>
            <div className="mt-[16px] w-[1098px] h-[257px] bg-[#D9D9D9] rounded-[5px] relative">
                <textarea
                    className="mx-[33px] my-[34px] w-[1032px] h-[188px] resize-none p-4 rounded-[5px]"
                    placeholder="댓글 작성"
                ></textarea>
                <button
                    className="absolute bottom-[40px] right-[40px] w-[180px] bg-black text-white font-bold rounded-lg hover:bg-[#747474]"
                    type="button">Post
                </button>
            </div>
        </div>
    );
}