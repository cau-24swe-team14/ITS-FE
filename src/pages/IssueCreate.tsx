import Container from "../components/Container";
import Card from "../components/Card";

export default function IssueCreate() {
    return(
        <Container>
            <div className="flex flex-col mx-[179px] my-[60px]">
                <div className="flex justify-between">
                    <span className="font-semibold text-[36px]">New Issue</span>
                    <button className="flex items-center justify-center bg-black text-white rounded-[5px] text-[20px] hover:bg-[#D9D9D9] hover:text-black w-[144px] h-[44px]">create</button>
                </div>
                <Card />
            </div>
        </Container>
    );
}