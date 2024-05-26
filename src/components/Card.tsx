import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface ICardProps {
    initialData?: {
        title?: string;
        description?: string;
        priority?: number;
        keyword?: number;
        dueDate?: string;
    };
}

export interface ICardRef {
    getFormData: () => {
        title: string;
        description: string;
        priority: number;
        keyword: number;
        dueDate: string;
    };
}


const Card = forwardRef<ICardRef, ICardProps>(({ initialData = {} }, ref) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 2);
    const [keyword, setKeyword] = useState(initialData.keyword || 0);
    const [dueDate, setDueDate] = useState(initialData.dueDate || '');

    useEffect(() => {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setPriority(initialData.priority || 2);
        setKeyword(initialData.keyword || 0);
        setDueDate(initialData.dueDate || '');
    }, [initialData]);

    useImperativeHandle(ref, () => ({
        getFormData: () => ({
            title,
            description,
            priority,
            keyword,
            dueDate: dueDate
        })
    }));

    const handlePriorityChange = (value: string) => {
        // const priorities = ["BLOCKER", "CRITICAL", "MAJOR", "MINOR", "TRIVIAL"];
        setPriority(parseInt(value));
    }
    
    const handleKeywordChange = (value: string) => {
        // const keywords = ["BUG", "FEATURE", "PERFORMANCE", "SECURITY", "UI", "DB", "INTEGRATION", "NETWORK", "API", "DOCS"];
        setKeyword(parseInt(value));
    };

    return(
        <div>
            <div className="mx-[36px] my-[36px] flex justify-center w-[1026px] h-[617px] bg-[#EDEDED] rounded-[5px]">
                <div className="flex flex-col">
                    <div className="flex flex-col mx-[77px] mt-[33px] w-[881px] h-[102px]">
                        <span className="text-[20px]">Title: </span>
                        <textarea value={title} onChange={(e) => setTitle(e.target.value)} className="px-[10px] py-[6px] my-[15px] w-[881px] h-[39px] rounded-[5px] resize-none" placeholder="제목을 입력하세요" />
                    </div>
                    <div className="flex flex-col mx-[77px] mt-[11px] w-[881px] h-[280px]">
                        <span className="text-[20px]">Description: </span>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="px-[10px] py-[5px] my-[15px] w-[881px] h-[241px] rounded-[5px] resize-none" placeholder="내용을 입력하세요" />
                    </div>
                    <div className="flex flex-row mx-[77px] mt-[33px] w-[881px] h-[39px]">
                        <span className="text-[20px]">Priority: </span>
                        <select value={priority} onChange={(e) => handlePriorityChange(e.target.value)} className="mx-[10px] w-[278px] h-[39px] border border-black rounded-[5px] px-[10px]">
                            <option value="0">BLOCKER</option>
                            <option value="1">CRITICAL</option>
                            <option value="2">MAJOR</option>
                            <option value="3">MINOR</option>
                            <option value="4">TRIVIAL</option>
                        </select>
                        <div className="flex flex-row ml-auto">
                            <span className="text-[20px]">Keyword: </span>
                            <select value={keyword} onChange={(e) => handleKeywordChange(e.target.value)} className="px-[10px] py-[6px] mx-[10px] w-[278px] h-[39px] rounded-[5px] resize-none" >
                                <option value="0">BUG</option>
                                <option value="1">FEATURE</option>
                                <option value="2">PERFORMANCE</option>
                                <option value="3">SECURITY</option>
                                <option value="4">UI</option>
                                <option value="5">DB</option>
                                <option value="6">INTEGRATION</option>
                                <option value="7">NETWORK</option>
                                <option value="8">API</option>
                                <option value="9">DOCS</option>
                            </select>
                        </div>
                    </div>
                    <div className="my-[33px] mx-[77px] flex flex-row">
                    <span className="text-[20px]">Due date: </span>
                            <textarea value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="px-[10px] py-[6px] mx-[10px] w-[278px] h-[39px] rounded-[5px] resize-none" />
                    </div>
                    
                </div>
            </div>
        </div>
    );
});

export default Card;