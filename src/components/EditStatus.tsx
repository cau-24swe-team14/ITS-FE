
export interface IEditStatusProps {
    status: string;
    accountRole: number;
}

export default function EditStatus({ status, accountRole }: IEditStatusProps) {    
    const isOptionDisabled = (optionValue: string) => {
        switch (accountRole) {
            case 0: // PL
                return !["assigned", "resolved"].includes(optionValue);
            case 1: // DEV
                return optionValue !== "fixed";
            case 2: // Tester
                return !["new", "closed", "reopened"].includes(optionValue);
            default:
                return true;
        }
    };

    return(
        <div className="flex flex-col mx-[171px] mb-[130px] w-[1098px] h-[108px]">
            <div className="font-semibold text-[24px]">Edit status</div>
            <div className="flex flex-row mt-[25px] w-[1098px] px-[45px] py-[10px] h-[54px] border border-[#747474] rounded-[5px]">
                <label className="flex justify-center items-center mr-[254px]">
                    <input type="radio" name="status" className="form-radio text-black h-[20px] w-[20px] mr-[10px]" />
                    <span className="text-[18px] font-medium">status - </span>
                    <select className="ml-[10px] border border-black rounded-[5px] w-[194px] h-[32px] px-[10px]" defaultValue={status}>
                        <option value="new" disabled={isOptionDisabled("new")}>new</option>
                        <option value="assigned" disabled={isOptionDisabled("assigned")}>assigned</option>
                        <option value="fixed" disabled={isOptionDisabled("fixed")}>fixed</option>
                        <option value="resolved" disabled={isOptionDisabled("resolved")}>resolved</option>
                        <option value="closed" disabled={isOptionDisabled("closed")}>closed</option>
                        <option value="reopened" disabled={isOptionDisabled("reopened")}>reopened</option>
                    </select>
                </label>
                <label className="flex items-center justify-center">
                    <input type="radio" name="status" className="form-radio text-black h-[20px] w-[20px] mr-[10px]" disabled={accountRole !== 2}/>
                    <span className="text-[18px] font-medium">reassign - </span>
                    <textarea className="w-[194px] h-[32px] px-[10px] ml-[10px] border border-black rounded-[5px] resize-none" disabled={accountRole !== 2}/>                
                </label>
            </div>
        </div>
    );
}