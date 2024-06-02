import React, { useState, useEffect } from 'react';
import Container from "../components/Container.tsx";
import "../css/list.css";
import editIcon from "../assets/edit.png"
import { useNavigate } from "react-router-dom";
import { getProject } from "../apis/apis.ts"

interface Project {
  id: number;
  title: string;
  status: number;
}

const ProjectStatus = ['Not Started', 'In Progress', 'Done']

const ProjectList: React.FC = () => {
    const [currentPage, handlePageChange] = useState(1);
    const [listNum, setlistNum] = useState(5);
    const [isAdmin, setIsAdmin] = useState();
    const [projects, setProjects] = useState<Project[]>([]);
    const [projectView, setProjectView] = useState(projects.slice(listNum*(currentPage-1), listNum*(currentPage)));
    const [filterView, setfilterView] = useState(projects);

    const nav = useNavigate();

    useEffect(() => {
        const loadprojects = async() => {
            try{
                const data = await getProject();
                setIsAdmin(data.isAdmin);
                setProjects(data.project);
                setfilterView(data.project);
                setProjectView(data.project.slice(0, listNum));
                console.log(projects)
            }catch(err){
                console.error(""+err)
            }
        }
    
        loadprojects();
    }, [listNum]);

    useEffect(() => {
        setProjectView(filterView.slice((currentPage - 1) * listNum, currentPage * listNum));
    }, [currentPage, filterView, listNum]);
    
    //누르면 프로젝트 추가 되도록(페이지 네비게이션)
    const createProject = () => {
        nav('/projects/create');
    };

    //edit 버튼 누르면 edit 택스트 추가되도록(페이지 네비게이션)
    const editProject = (id:number) => {
        nav(`/projects/${id}/update`);
    };

    //화면상에 보이는 project 숫자
    const listSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setlistNum(Number(e.target.value));
        handlePageChange(1);
    };

    //필터 적용
    const filtering_status = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handlePageChange(1);
        const status = Number(e.target.value)
        if(status>-1){
            const filter_result = projects.filter((projects)=>projects.status == status)
            setfilterView(filter_result)
        }else{
            setfilterView(projects)
        }
    };

    return (
        <Container>
            <div>
                <h2 className='main-title'>Project</h2>
                <div className='search-bar'>
                <div className='search-filter'>
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
                        {isAdmin===1 && (
                            <button onClick={createProject}>+ Create Project</button>
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                {projectView.map((project:any) => (
                    <tr key={project.id}>
                    <td><text onClick={()=>nav(`/projects/`+project.id)}>{project.title}</text></td>
                    <td className = "status-container">
                        <text onClick={()=>nav(`/projects/`+project.id)}>{ProjectStatus[project.status]}</text>
                        {isAdmin===1 && (
                            <button className="edit-botton" onClick={() => {editProject(project.id)}}>
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