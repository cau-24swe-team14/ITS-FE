import { useState, useEffect, useRef } from 'react';
import Container from "../components/Container";
import Card, { ICardRef } from "../components/Card";
import { patchIssue, fetchIssue } from "../apis/apis";

export default function IssueEdit() {
    const [issueData, setIssueData] = useState(null);
    const cardRef = useRef<ICardRef>(null);
    const projectId = 1;
    const issueId = 1;

    useEffect(() => {
        async function fetchIssueData() {
            try {
                const data = await fetchIssue(projectId, issueId);
                setIssueData(data);
            } catch (error) {
                console.error('Failed to load issue data:', error);
            }
        }

        
        fetchIssueData();
    }, []);

    const handleSave = async () => {
        if (cardRef.current) {
            const formData = cardRef.current.getFormData();
            try {
                await patchIssue(projectId, issueId, formData);
            } catch (error) {
                console.error('이슈 업데이트 실패:', error);
            }
        }
    };

    if (!issueData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <div className="flex flex-col mx-[179px] my-[60px]">
                <div className="flex justify-between">
                    <span className="font-semibold text-[36px]">Edit Issue</span>
                    <button onClick={handleSave} className="flex items-center justify-center text-white bg-black rounded-[5px] text-[20px] hover:bg-[#D9D9D9] hover:text-black w-[144px] h-[44px]">save</button>
                </div>
                <Card ref={cardRef} initialData={issueData}/>
            </div>
        </Container>
    );
}