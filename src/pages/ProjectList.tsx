import React, { useState } from 'react';
import Container from "../components/Container.tsx";
import "../css/list.css";
import editIcon from "../assets/edit.png"
import serchIcon from "../assets/search.png"
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  status: number;
}

const ProjectStatus = ['Not Started', 'In Progress', 'Done']

const ProjectList: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, handlePageChange] = useState(1);
    const [listNum, setlistNum] = useState(5);
    const nav = useNavigate();

    //어드민 계정 활성화/비활성화
    const isAdmin = true

    //프로젝트가 어떻게 나오는지 예시
    const [projects, setProjects] = useState<Project[]>([
        { id: 1, title: 'Project Alpha', status: 0 },
        { id: 2, title: 'Project Beta', status: 1 },
        { id: 3, title: 'Project Gamma', status: 1 },
        { id: 4, title: 'Project Gamma', status: 1 },
        { id: 5, title: 'Project Gamma', status: 2 },
        { id: 6, title: 'Project Gamma', status: 2 },
        { id: 7, title: 'Project Gamma', status: 0 },
    ]);

    const [projectView, setProjectView] = useState(projects.slice(listNum*(currentPage-1), listNum*(currentPage)));
    const [filterView, setfilterView] = useState(projects);

    //누르면 프로젝트 추가 되도록(페이지 네비게이션)
    const createProject = () => {};

    //edit 버튼 누르면 edit 택스트 추가되도록(페이지 네비게이션)
    const editProject = () => {};

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
        setProjectView(filterView.slice(Number(e.target.value)*0, Number(e.target.value)*1))
    };

    //필터 적용
    const filtering_status = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handlePageChange(1);
        const status = Number(e.target.value)
        if(status>-1){
            const filter_result = projects.filter(project => project.status == status)
            setProjectView(filter_result.slice(listNum*0, listNum*1))
            setfilterView(filter_result)
        }else{
            setfilterView(projects)
            setProjectView(projects.slice(listNum*0, listNum*1))
        }
    };

    return (
        <Container>
            <div>
                <h2 className='main-title'>Project</h2>
                <div className='search-bar'>
                <div className='search-filter'>
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
                        <select className="list-veiw" onChange={filtering_status}>
                            <option value="-1">any</option>
                            <option value="0">not Started</option>
                            <option value="1">in Progress</option>
                            <option value="2">Done</option>
                        </select>
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
                        <text onClick={()=>nav(`/issuelist/`+project.id)}>{ProjectStatus[project.status]}</text>
                        {isAdmin && (
                            <button className="edit-botton" onClick={editProject}>
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
                    {currentPage>1?<span onClick={() => {handlePageChange(currentPage - 1); setProjectView(filterView.slice(listNum*(currentPage-2), listNum*(currentPage-1)))}}>
                        &lt;</span>:<span>&lt;</span>}
                    {currentPage}
                    {currentPage<Math.ceil(filterView.length/listNum)?<span onClick={() => {handlePageChange(currentPage + 1); setProjectView(filterView.slice(listNum*(currentPage), listNum*(currentPage+1)))}}>
                        &gt;</span>:<span>&gt;</span>}
                </div>
            </div>
        </Container>
    );
};

export default ProjectList