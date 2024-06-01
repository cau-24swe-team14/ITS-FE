import { useState, useEffect } from "react";
import { patchIssue } from "../apis/apis";

export interface IEditStatusProps {
    status: string;
    accountRole: number;
    projectId: number;
    issueId: number;
    assignee: string;
}

const stat = ["NEW", "ASSIGNED", "FIXED", "RESOLVED", "CLOSED", "REOPENED"];

export default function EditStatus({ status, accountRole, projectId, issueId, assignee }: IEditStatusProps) {    
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [assign, setAssign] = useState(assignee);

    useEffect(() => {
        setSelectedStatus(status);
        setAssign(assignee);
    }, [status, assignee]);

    const isOptionDisabled = (optionValue: string) => {
        switch (accountRole) {
            case 0: // PL
                return !["ASSIGNED", "CLOSED"].includes(optionValue);
            case 1: // DEV
                return optionValue !== "FIXED";
            case 2: // Tester
                return !["NEW", "RESOLVED", "REOPENED"].includes(optionValue);
            default:
                return true;
        }
    };

    const findIndexByStatus = (status: string) => {
        return stat.indexOf(status);
    };

    const handleSaveStatus = async () => {
        try {
            const statusIndex = findIndexByStatus(selectedStatus);
            console.log(statusIndex);
            if (statusIndex === -1) {
                console.error("invalid status value"); 
                return;
            }
            const statusData: {status:number} = { status: statusIndex };
            const assigneeData: {assignee?: string} = {};
            if (assign) assigneeData.assignee = assign;
            await patchIssue(projectId, issueId, { ...statusData, ...assigneeData });
            console.log("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(e.target.value);
    };

    const handleAssigneeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAssign(e.target.value);
    };

    return(
        <div className="flex flex-col mx-[171px] mb-[130px] w-[1098px] h-[108px]">
            <div className="font-semibold text-[24px]">Edit status</div>
            <div className="flex flex-row mt-[25px] w-[1098px] px-[45px] py-[10px] h-[54px] border border-[#747474] rounded-[5px]">
                <label className="flex justify-center items-center mr-[254px]">
                    <span className="text-[18px] font-medium">status - </span>
                    <select 
                        className="ml-[10px] border border-black rounded-[5px] w-[194px] h-[32px] px-[10px]" 
                        value={selectedStatus}
                        onChange={handleStatusChange} >
                        {stat.map((statusOption) => (
                            <option key={statusOption} value={statusOption} disabled={isOptionDisabled(statusOption)}>
                                {statusOption}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="flex items-center justify-center">
                    <span className="text-[18px] font-medium">assign - </span>
                    <textarea className="w-[194px] h-[32px] px-[10px] ml-[10px] border border-black rounded-[5px] resize-none" value={assignee}
                        onChange={handleAssigneeChange} disabled={assignee !== "" || accountRole !== 0}/>                
                </label>
                <div className="ml-auto flex items-center">
                    <button className="px-[12px] py-[6px] w-[120px] bg-black text-white rounded-[5px] hover:bg-[#D9D9D9] hover:text-black" onClick={handleSaveStatus}>Save</button>
                </div>
            </div>
        </div>
    );
}