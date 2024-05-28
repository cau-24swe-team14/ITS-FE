import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container.tsx";
import Ticket from "../components/Ticket.tsx";
import Comment from "../components/Comment.tsx";
import CommentList from "../components/CommentList.tsx";
import EditStatus from "../components/EditStatus.tsx";
import { getIssueDetail, postComment } from "../apis/apis.ts";

interface IParams {
    projectId: string;
    issueId: string;
    [key: string]: string;
}


export default function IssueDetail() {
    const { projectId, issueId } = useParams<IParams>() as IParams;
    const [issue, setIssue] = useState<any>({});    
    // const [loading, setLoading] = useState<boolean>(true);

    const loadIssue = async () => {
        try {
            // if(projectId && issueId){
                console.log(`Fetching issue details for projectId: ${projectId}, issueId: ${issueId}`);
                const data = await getIssueDetail(1, 1);
                // parseInt(projectId), parseInt(issueId)
                console.log('Fetched issue data:', data);

                setIssue(data);
            // } else {
            //    console.error('Project ID or Issue ID is missing');
            // }
        } catch (error) {
            console.error('Failed to fetch issue:', error);
        } 
        // finally {
        //     setLoading(false);
        // }
    };
    
    useEffect(() => {
        loadIssue();
    }, [projectId, issueId]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (!issue) {
    //     return <div>No issue found</div>;
    // }
    

    const handleCommentPosted = async (content: string) => {
        if (projectId && issueId) {
          try {
            console.log(`Posting comment for projectId: ${projectId}, issueId: ${issueId}`);

            await postComment(parseInt(projectId), parseInt(issueId), { content });
            // Reload issue details including new comments
            const updatedIssue = await getIssueDetail(parseInt(projectId), parseInt(issueId));
            console.log('Updated issue data after posting comment:', updatedIssue);

            setIssue(updatedIssue);
          } catch (error) {
            console.error('Failed to post comment:', error);
          }
        }
    };

    return (
            <Container>
                <div className="flex flex-col">
                    <Ticket 
                        accountRole={issue.accountRole}
                        title={issue.title}
                        description={issue.description}
                        reporter={issue.reporter}
                        assignee={issue.assignee}
                        priority={issue.priority}
                        keyword={issue.keyword}
                    />
                    <EditStatus accountRole={issue.accountRole} status={issue.status}/>
                    <Comment 
                        projectId={parseInt(projectId)}
                        issueId={parseInt(issueId)}
                        onCommentPosted={handleCommentPosted} />
                    <CommentList comments={issue.comment}/>
                </div>
            </Container>
        
    );
}