import { useRef, useState } from 'react';
import Container from "../components/Container";
import Card, { ICardRef } from "../components/Card";
import { postIssue } from "../apis/apis";
import { useNavigate, useParams } from 'react-router-dom';


export default function IssueCreate() {
    const { projectId } = useParams<{projectId:string}>();
    const cardRef = useRef<ICardRef>(null);
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 2,
        keyword: 0,
        dueDate: ''
    });

    const handleCreateIssue = async () => {
        if (cardRef.current) {
            const issueData = cardRef.current.getFormData();
            if (!projectId) throw new Error('projectId is undefined');
            try {
                setFormData(issueData);
                const response = await postIssue(parseInt(projectId), issueData);
                console.log('Issue created successfully:', response);
                nav(`${response.headers.location}`);
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