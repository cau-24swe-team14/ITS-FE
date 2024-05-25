import { useRef, useState } from 'react';
import Container from "../components/Container";
import Card, { ICardRef } from "../components/Card";
import { postIssue } from "../apis/apis";

export default function IssueCreate() {
    const cardRef = useRef<ICardRef>(null);
    const [formData] = useState({
        title: '',
        description: '',
        priority: 'major',
        keyword: '',
        due_date: ''
    });

    const handleCreateIssue = async () => {
        if (cardRef.current) {
            // const issueData = cardRef.current.getFormData();
            try {
                const response = await postIssue(formData);
                console.log('Issue created successfully:', response);
            } catch (error) {
                console.error('Error creating issue:', error);
            }
        }
    };

    return(
        <Container>
            <div className="flex flex-col mx-[179px] my-[60px]">
                <div className="flex justify-between">
                    <span className="font-semibold text-[36px]">New Issue</span>
                    <button onClick={handleCreateIssue} className="flex items-center justify-center bg-black text-white rounded-[5px] text-[20px] hover:bg-[#D9D9D9] hover:text-black w-[144px] h-[44px]">create</button>
                </div>
                <Card initialData={formData} ref={cardRef} />
            </div>
        </Container>
    );
}