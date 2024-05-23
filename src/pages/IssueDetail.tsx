import Container from "../components/Container.tsx";
import Ticket from "../components/Ticket.tsx";
import Comment from "../components/Comment.tsx";
import CommentList from "../components/CommentList.tsx";
import EditStatus from "../components/EditStatus.tsx";

export default function IssueDetail() {
    return (
            <Container>
                <div className="flex flex-col">
                    <Ticket />
                    <EditStatus />
                    <Comment />
                    <CommentList />
                </div>
            </Container>
        
    );
}