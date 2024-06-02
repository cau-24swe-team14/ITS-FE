import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container.tsx";
import Ticket from "../components/Ticket.tsx";
import Comment from "../components/Comment.tsx";
import CommentList from "../components/CommentList.tsx";
import EditStatus from "../components/EditStatus.tsx";
import { getIssueDetail } from "../apis/apis.ts";

interface IParams {
    projectId: string;
    issueId: string;
    [key: string]: string;
}

export default function IssueDetail() {
    const { projectId, issueId } = useParams<IParams>() as IParams;
    const [issue, setIssue] = useState<any>({});    

    const loadIssue = async () => {
        try {
            if(projectId && issueId){
                console.log(`Fetching issue details for projectId: ${projectId}, issueId: ${issueId}`);
                const data = await getIssueDetail(parseInt(projectId), parseInt(issueId));
                console.log('Fetched issue data:', data);

                setIssue(data);

            } else {
               console.error('Project ID or Issue ID is missing');
            }
        } catch (error) {
            console.error('Failed to fetch issue:', error);
        } 
    };
    
    useEffect(() => {
        loadIssue();
    }, [projectId, issueId]);

    const handleCommentPosted = async () => {
        loadIssue(); 
    };

    return (
            <Container>
                <div className="flex flex-col">
                    <Ticket 
                        issueId={issue.issueId}
                        accountRole={issue.accountRole}
                        title={issue.title}
                        description={issue.description}
                        reporter={issue.reporter}
                        assignee={issue.assignee}
                        priority={issue.priority}
                        keyword={issue.keyword}
                    />
                    <EditStatus assignee={issue.assginee} accountRole={issue.accountRole} status={issue.status} projectId={parseInt(projectId)} issueId={parseInt(issueId)}/>
                    <Comment 
                        projectId={parseInt(projectId)}
                        issueId={parseInt(issueId)}
                        onCommentPosted={handleCommentPosted} />
                    <CommentList comments={issue.comment}/>
                </div>
            </Container>
        
    );
}