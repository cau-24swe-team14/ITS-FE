import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';

interface ICardProps {
    initialData?: {
        title?: string;
        description?: string;
        priority?: string;
        keyword?: string;
        due_date?: string;
    };
}

export interface ICardRef {
    getFormData: () => {
        title: string;
        description: string;
        priority: string;
        keyword: string;
        due_date: string;
    };
}

const Card = forwardRef<ICardRef, ICardProps>(({ initialData = {} }, ref) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [description, setDescription] = useState(initialData.description || '');
    const [priority, setPriority] = useState(initialData.priority || 'major');
    const [keyword, setKeyword] = useState(initialData.keyword || '');
    const [dueDate, setDueDate] = useState(initialData.due_date || '');

    useEffect(() => {
        setTitle(initialData.title || '');
        setDescription(initialData.description || '');
        setPriority(initialData.priority || 'major');
        setKeyword(initialData.keyword || '');
        setDueDate(initialData.due_date || '');
    }, [initialData]);

    useImperativeHandle(ref, () => ({
        getFormData: () => ({
            title,
            description,
            priority,
            keyword,
            due_date: dueDate
        })
    }));
    
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
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mx-[10px] w-[278px] h-[39px] border border-black rounded-[5px] px-[10px]">
                            <option value="blocker">blocker</option>
                            <option value="critical">critical</option>
                            <option value="major">major</option>
                            <option value="minor">minor</option>
                            <option value="trivial">trivial</option>
                        </select>
                        <div className="flex flex-row ml-auto">
                            <span className="text-[20px]">Keyword: </span>
                            <textarea value={keyword} onChange={(e) => setKeyword(e.target.value)} className="px-[10px] py-[6px] mx-[10px] w-[278px] h-[39px] rounded-[5px] resize-none" />
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