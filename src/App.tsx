import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import IssueDetail from './pages/IssueDetail.tsx';
import IssueEdit from './pages/IssueEdit.tsx';

export default function App() {
  return (
    <Routes>
      <Route path={`/`} element={<Home />} />
      <Route path={`/issuedetail`} element={<IssueDetail />} />
      <Route path={`/issueedit`} element={<IssueEdit />} />
    </Routes>
  )
}
