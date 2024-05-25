export default function Card() {
    return(
        <div>
            <div className="mx-[36px] my-[36px] flex justify-center w-[1026px] h-[617px] bg-[#EDEDED] rounded-[5px]">
                <div className="flex flex-col">
                    <div className="flex flex-col mx-[77px] mt-[33px] w-[881px] h-[102px]">
                        <span className="text-[20px]">Title: </span>
                        <textarea className="px-[10px] py-[6px] my-[15px] w-[881px] h-[39px] rounded-[5px] resize-none" placeholder="제목을 입력하세요" />
                    </div>
                    <div className="flex flex-col mx-[77px] mt-[11px] w-[881px] h-[280px]">
                        <span className="text-[20px]">Description: </span>
                        <textarea className="px-[10px] py-[5px] my-[15px] w-[881px] h-[241px] rounded-[5px] resize-none" placeholder="내용을 입력하세요" />
                    </div>
                    <div className="flex flex-row mx-[77px] mt-[33px] w-[881px] h-[39px]">
                        <span className="text-[20px]">Priority: </span>
                        <select className="mx-[10px] w-[278px] h-[39px] border border-black rounded-[5px] px-[10px]">
                            <option value="blocker">blocker</option>
                            <option value="critical">critical</option>
                            <option value="major" selected>major</option>
                            <option value="minor">minor</option>
                            <option value="trivial">trivial</option>
                        </select>
                        <div className="flex flex-row ml-auto">
                            <span className="text-[20px]">Keyword: </span>
                            <textarea className="px-[10px] py-[6px] mx-[10px] w-[278px] h-[39px] rounded-[5px] resize-none" />
                        </div>
                    </div>
                    <div className="my-[33px] mx-[77px] flex flex-row">
                    <span className="text-[20px]">Due date: </span>
                            <textarea className="px-[10px] py-[6px] mx-[10px] w-[278px] h-[39px] rounded-[5px] resize-none" />
                    </div>
                </div>
            </div>
        </div>
    );
}