import { useEffect, useState } from "react";
import Container from "../components/Container.tsx";
import Ticket from "../components/Ticket.tsx";
import Comment from "../components/Comment.tsx";
import CommentList from "../components/CommentList.tsx";
import EditStatus from "../components/EditStatus.tsx";
import { getIssueDetail } from "../apis/apis.ts";

export default function IssueDetail() {
    const [issue, setIssue] = useState<any>(null);

    useEffect(() => {
        const loadIssue = async () => {
            try {
                const data = await getIssueDetail();
                setIssue(data);
            } catch (error) {
                console.error('Failed to fetch issue:', error);
            }
        };
        loadIssue();
    }, []);

    if (!issue) {
        return <div>Loading...</div>;
    }

    return (
            <Container>
                <div className="flex flex-col">
                    <Ticket 
                        title={issue.title}
                        description={issue.description}
                        reporter={issue.reporter}
                        assignee={issue.assignee}
                        priority={issue.priority}
                        keyword={issue.keyword}
                    />
                    <EditStatus status={issue.status}/>
                    <Comment />
                    <CommentList comments={issue.comment}/>
                </div>
            </Container>
        
    );
}