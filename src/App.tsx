import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import IssueDetail from './pages/IssueDetail.tsx';
import IssueEdit from './pages/IssueEdit.tsx';
import IssueCreate from './pages/IssueCreate.tsx';
import IssueStatics from './components/IssueStatics.tsx';
import IssueList from './pages/IssueList.tsx';
import LoginForm from './components/LoginForm.tsx';
import SignupForm from './components/SignupForm.tsx';
import ProjectList from './pages/ProjectList.tsx';
import ProjectCreate from "./pages/ProjectCreate.tsx";
import ProjectUpdate from "./pages/ProjectUpdate.tsx";

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/users/login`} element={<LoginForm />} />
      <Route path={`/users/signup`} element={<SignupForm />} />
      <Route path={`/issuedetail/:issueid`} element={<IssueDetail />} />
      <Route path={`/issueedit`} element={<IssueEdit />} />
      <Route path={`/issuecreate`} element={<IssueCreate />} />
      <Route path={`/issuestatics`} element={<IssueStatics />} />
      <Route path={`/issuelist/:projectid`} element={<IssueList />} />
      <Route path={`/projectlist`} element={<ProjectList />} />
      <Route path={`/project/create`} element={<ProjectCreate />} />
      <Route path={`/project/update/:projectid`} element={<ProjectUpdate />} />
    </Routes>
  )
}
