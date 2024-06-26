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
          <div className = "my-[30px] text-[40px]">Project</div>
          {/* 임의로 넣은 버튼 삭제해도 됨 */}
          <button onClick={() => navigate('/users/login')} className="px-4 cursor-pointer text-themeDark text-xs">Login</button>
          <button onClick={() => navigate('/users/signup')} className="px-4 cursor-pointer text-themeDark text-xs">SignUp</button>
          <button onClick={() => navigate('/projects/:projectid/issues/:issueid')} className="px-4 cursor-pointer text-themeDark text-xs">IssueDetail</button>
          <button onClick={() => navigate('/projects')} className="px-4 cursor-pointer text-themeDark text-xs">ProjectList</button>
          <button onClick={() => navigate('/projects/:projectid/issues/issuecreate')} className="px-4 cursor-pointer text-themeDark text-xs">issuecreate</button>
          <button onClick={() => navigate('/issuestatics')} className="px-4 cursor-pointer text-themeDark text-xs">issuestatics</button>
          <button onClick={() => navigate('/projects/:projectid')} className="px-4 cursor-pointer text-themeDark text-xs">issuelist</button>
          <button onClick={() => navigate('/projects/:projectid/update')} className="px-4 cursor-pointer text-themeDark text-xs">projectedit</button>

        </div>
      </div>
    </Container>
  );
}