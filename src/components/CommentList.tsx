export default function CommentList() {
    return(
        <div className="flex flex-col mx-[171px] mb-[81px] w-[1098px] h-[302px]">
            <div className="text-[24px] font-semibold">Comment List</div>
            <div className="mt-[16px] w-[1098px] h-[257px] bg-white border border-[#747474]">
                <div className="flex justify-between mt-[27px] mx-[37px]">
                    <div className="font-normal text-[20px]"> Username</div>
                    <div>2024.05.23</div>
                </div>
                <div className="mx-[19px] my-[20px] border border-dashed border-[#747474] w-[1058px]"></div>
                <div className="mx-[33px] font-normal">내용</div>
            </div>
        </div>
    );
}