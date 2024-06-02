import { useState, useEffect } from "react";
import { patchIssue, getAssinee } from "../apis/apis";

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
    const [assignees, setAssignee] = useState<string[]>([]);

    useEffect(() => {
        setSelectedStatus(status);
        setAssign(assignee);
    }, [status, assignee]);

    useEffect(() => {
        const fetchAssignees = async () => {
            try {
                const response = await getAssinee(projectId, issueId);
                setAssignee(response.username);
            } catch (error) {
                console.error("Error fetching assignees:", error);
            }
        };

        if (accountRole === 0 && status === "NEW") {
            fetchAssignees();
        }
    }, [projectId, accountRole, status]); 

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
            if (statusIndex === -1) {
                console.error("invalid status value"); 
                return;
            }
            const statusData: {status:number} = { status: statusIndex };
            const assigneeData: {assignee?: string} = {};
            if (assign) assigneeData.assignee = assign;
            await patchIssue(projectId, issueId, { ...statusData, ...assigneeData });
            console.log("Status updated successfully!");
            window.location.reload();
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

    const handleAssigneeClick = (selectedAssignee: string) => {
        setAssign(selectedAssignee);
    };

    return(
        <div className="flex flex-col mx-[171px] mb-[130px] w-100% h-[108px]">
            <div className="font-semibold text-[24px]">Edit status</div>
            <div className="flex flex-row mt-[25px] w-[1098px] px-[45px] py-[10px] border border-[#747474] rounded-[5px]">
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
                    <span className="text-[18px] font-medium">assignee - </span>
                    <textarea 
                        className="w-[194px] h-[32px] px-[10px] ml-[10px] border border-black rounded-[5px] resize-none flex items-center" 
                        value={assign}
                        onChange={handleAssigneeChange} 
                        disabled={status !== "NEW" || accountRole !== 0}/>                
                </label>
                <div className="ml-auto flex items-center">
                    <button 
                        className="px-[12px] py-[6px] w-[120px] bg-black text-white rounded-[5px] hover:bg-[#D9D9D9] hover:text-black" 
                        onClick={handleSaveStatus}>Save</button>
                </div>
            </div>
            {accountRole === 0 && status === "NEW" && (
                <div className="mt-4 w-full flex justify-end">
                    <div className="px-[10px] w-1/2">
                    <span className="text-[15px] font-medium mx-[5px]">Assignee recommendations:</span>
                    <span 
                        className="mr-2 underline text-[15px]"
                        onClick={() => handleAssigneeClick(assignee)}>
                        {assignees}
                    </span>
                </div>
                </div>
            )}
        </div>
    );
}
