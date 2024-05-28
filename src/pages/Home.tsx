import Container from "../components/Container.tsx";
import { useNavigate } from "react-router-dom";
/**
 * @returns 메인페이지
 */

export default function Home() {
  const navigate = useNavigate();

  return (
    <Container>
      {/* 마진 임의로 넣음 */}
      <div className="mx-auto">
        <div className="flex flex-col justify-between my-[77px] mx-[95px]">
          <h1 className = "my-[30px]">Project</h1>
          {/* 임의로 넣은 버튼 삭제해도 됨 */}
          <button onClick={() => navigate('/issuedetail')} className="px-4 cursor-pointer text-themeDark text-xs">issuedetail</button>
          <button onClick={() => navigate('/issuecreate')} className="px-4 cursor-pointer text-themeDark text-xs">issuecreate</button>
          <button onClick={() => navigate('/issuestatics')} className="px-4 cursor-pointer text-themeDark text-xs">issuestatics</button>
        </div>
      </div>
    </Container>
  );
}