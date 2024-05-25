import React from "react";
import { useNavigate } from "react-router-dom";
import editImage from "../assets/edit.png";

export interface ITicketProps {
    title: string;
    description: string;
    reporter: string;
    assignee: string;
    priority: string;
    keyword: string;
}

const Ticket: React.FC<ITicketProps> = ({ title, description, reporter, assignee, priority, keyword }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col mx-[171px] my-[80px] w-[1098px] h-[422px] bg-[#D9D9D9] rounded-[5px]">
            <div className="flex flex-row justify-between">
                <div className="ml-[21px] mt-[20px] text-[36px] font-semibold">#1</div>
                <button onClick={() => navigate('/issuecreate')}></button>
                <img src={editImage} alt="수정" className="mt-[33px] mr-[28px] w-[20px] h-[20px]" onClick={() => navigate('/issueedit')} />
            </div>
            <div className="mx-[31px]">
                <div className="mb-[7px] font-semibold text-[24px]">
                    {title}
                </div>
                <hr className="flex justify-center border border-black w-[1044px]" />
                <div className="flex flex-col mx-[20px] my-[20px]">
                    <div className="flex justify-between">
                        <div className="flex flex-row">
                            <span className="text-[15px]">Reporter: </span>
                            <div className="text-[15px]">{reporter}</div>
                        </div>
                        <div className="flex flex-row mx-auto">
                            <span className="text-[15px]">Assignee: </span>
                            <div className="text-[15px]"> {assignee}</div>
                        </div>
                    </div>
                    <div className="flex justify-between my-[25px]">
                        <div className="flex flex-row">
                            <span className="text-[15px]">Priority: </span>
                            <div className="text-[15px]">{priority}</div>
                        </div>
                        <div className="flex flex-row ml-[398px] mr-auto">
                            <span className="text-[15px]">Keyword: </span>
                            <div className="text-[15px]">{keyword}</div>
                        </div>
                    </div>
                </div>
                <div className="mb-[7px] font-semibold text-[24px]">
                    Description
                </div>
                <hr className="mb-[20px] flex justify-center border border-black w-[1044px]" />
                <div className="mx-[20px]">{description}</div>
            </div>
        </div>
        // test
    );
}

export default Ticket;
