import { useState, useEffect, useRef } from 'react';
import Container from "../components/Container";
import Card, { ICardRef } from "../components/Card";
import { patchIssue, fetchIssue } from "../apis/apis";
import { useNavigate, useParams } from 'react-router-dom';

export default function IssueEdit() {
    const {projectId, issueId} = useParams<{projectId : any, issueId : any}>();
    const [issueData, setIssueData] = useState(null);
    const cardRef = useRef<ICardRef>(null);
    const nav = useNavigate();

    useEffect(() => {
        async function fetchIssueData() {
            try {
                if (!projectId || !issueId) {
                    throw new Error('projectId or issueId is undefined');
                }
                const data = await fetchIssue(projectId, issueId);
                console.dir("fatchissue" + data);
                setIssueData(data);
            } catch (error) {
                console.error('Failed to load issue data:', error);
            }
        }

        fetchIssueData();
    }, [projectId, issueId]);

    function isEqual(obj1:any, obj2:any) {
        const jsonString1 = JSON.stringify(obj1);
        const jsonString2 = JSON.stringify(obj2);
        return jsonString1 === jsonString2;
    }


    const handleSave = async () => {
        if (!projectId || !issueId) {
            console.error('projectId or issueId is undefined');
            return;
        }
        if (cardRef.current) {
            const formData = cardRef.current.getFormData();
            console.dir("formdata", JSON.stringify(formData));
            const isChanged = !isEqual(formData, issueData); // Check if form data is changed
            if (isChanged) {
                try {
                    await patchIssue(projectId, issueId, formData);
                    nav(`/projects/${projectId}/issues/${issueId}`)
                } catch (error) {
                    console.error('이슈 업데이트 실패:', error);
                }
            } else {
                alert('변경 사항이 없습니다.');
                nav(-1);
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