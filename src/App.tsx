import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import IssueDetail from './pages/IssueDetail.tsx';
import IssueEdit from './pages/IssueEdit.tsx';
import ProjectList from './pages/ProjectList.tsx';
import IssueList from './pages/IssueList.tsx';

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/issuedetail/:issueid`} element={<IssueDetail />} />
      <Route path={`/issueedit`} element={<IssueEdit />} />
      <Route path={`/projectlist`} element={<ProjectList />} />
      <Route path={`/issuelist/:projectid`} element={<IssueList />} />
    </Routes>
  )
}
