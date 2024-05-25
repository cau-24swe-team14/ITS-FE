import React, { useState } from 'react';
import Container from "../components/Container.tsx";
import "../css/list.css";
import editIcon from "../assets/edit.png"
import serchIcon from "../assets/search.png"
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  status: string;
}

const ProjectList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, handlePageChange] = useState(1);
    const [listNum, setlistNum] = useState(5);
    const nav = useNavigate();

    //어드민 계정 활성화/비활성화
    const isAdmin = true

    //프로젝트가 어떻게 나오는지 예시
    const [projects, setProjects] = useState<Project[]>([
        { id: 1, title: 'Project Alpha', status: 'Not Started' },
        { id: 2, title: 'Project Beta', status: 'In Progress' },
        { id: 3, title: 'Project Gamma', status: 'Completed' },
        { id: 4, title: 'Project Gamma', status: 'Completed' },
        { id: 5, title: 'Project Gamma', status: 'Completed' },
        { id: 6, title: 'Project Gamma', status: 'Completed' },
        { id: 7, title: 'Project Gamma', status: 'Completed' },
    ]);

    const [projectView, setProjectView] = useState(projects.slice(listNum*(currentPage-1), listNum*(currentPage)));


    //누르면 프로젝트 추가 되도록(확인용)
    const createProject = () => {
        const newProject: Project = { id: projects.length + 1, title: `Project ${projects.length + 1}`, status: 'Not Started' };
        setProjects([...projects, newProject]);
    };

    //edit 버튼 누르면 edit 택스트 추가되도록(확인용)
    const editProject = (id: number) => {
        const updatedProjects = projects.map(project =>
        project.id === id ? { ...project, title: `${project.title} (edited)` } : project
        );
        setProjects(updatedProjects);
    };

    //검색 버튼을 눌렀을떄 수행
    const handleSearch = () => {
        // 검색 로직 추가
        console.log(`Searching for: ${searchTerm}`);
        // 실제 검색 로직을 여기서 수행
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    //화면상에 보이는 project 숫자
    const listSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setlistNum(Number(e.target.value));
        handlePageChange(1);
        setProjectView(projects.slice(Number(e.target.value)*0, Number(e.target.value)*1))
    };

    return (
        <Container>
            <div>
                <h2 className='main-title'>Project</h2>
                <div className='search-bar'>
                    <div className='search'>    
                        <input
                            type="text"
                            placeholder="search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button className="search-button" onClick={handleSearch}>
                            <img src = {serchIcon} alt = "" className='search-icon'/> 
                        </button>
                    </div>
                
                    <select className="list-veiw" onChange={listSelect}>
                        <option value="5">5개씩 보기</option>
                        <option value="10">10개씩 보기</option>
                        <option value="25">25개씩 보기</option>
                    </select>
                </div>
                <table style={{ height: `${50 * (listNum+1)}px` }}>
                <thead>
                <tr>
                    <th className = 'title'>Title</th>
                    <th className = 'create'>
                        Status
                        {isAdmin && (
                            <button onClick={createProject}>+ Create Project</button>
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                {projectView.map(project => (
                    <tr key={project.id}>
                    <td><text onClick={()=>nav(`/issuelist/`+project.id)}>{project.title}</text></td>
                    <td className = "status-container">
                        <text onClick={()=>nav(`/issuelist/`+project.id)}>{project.status}</text>
                        {isAdmin && (
                            <button className="edit-botton" onClick={() => editProject(project.id)}>
                                <img src={editIcon} alt="edit"/>
                            </button>
                        )}  
                    </td>
                    </tr>
                ))}
                    <tr></tr>
                </tbody>
                </table>
                <div className="pagination">
                    {currentPage>1?<span onClick={() => {handlePageChange(currentPage - 1); setProjectView(projects.slice(listNum*(currentPage-2), listNum*(currentPage-1)))}}>
                        &lt;</span>:<span>&lt;</span>}
                    {currentPage}
                    {currentPage<Math.ceil(projects.length/listNum)?<span onClick={() => {handlePageChange(currentPage + 1); setProjectView(projects.slice(listNum*(currentPage), listNum*(currentPage+1)))}}>
                        &gt;</span>:<span>&gt;</span>}
                </div>
            </div>
        </Container>
    );
};

export default ProjectList