import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import IssueDetail from './pages/IssueDetail.tsx';
import IssueEdit from './pages/IssueEdit.tsx';
import IssueCreate from './pages/IssueCreate.tsx';
import IssueStatics from './components/IssueStatics.tsx';
import ProjectList from './pages/ProjectList.tsx';
import IssueList from './pages/IssueList.tsx';
import LoginForm from './components/LoginForm.tsx';
import SignupForm from './components/SignupForm.tsx';
import ProjectCreate from './pages/ProjectCreate.tsx';
import ProjectEdit from './pages/ProjectEdit.tsx';

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/users/login`} element={<LoginForm />} />
      <Route path={`/users/signup`} element={<SignupForm />} />
      <Route path={`/projects/:projectId/issues/:issueId`} element={<IssueDetail />} />
      <Route path={`/projects/:projectId/issues/:issueId/issueedit`} element={<IssueEdit />} />
      <Route path={`/projects/:projectId/issues/issuecreate`} element={<IssueCreate />} />
      <Route path={`/issuestatics`} element={<IssueStatics />} />
      <Route path={`/projects`} element={<ProjectList />} />
      <Route path={`/projects/:projectId/update`} element={<ProjectEdit />} />
      <Route path={`/projects/create`} element={<ProjectCreate />} />
      <Route path={`/projects/:projectId`} element={<IssueList />} />
    </Routes>
  )
}
