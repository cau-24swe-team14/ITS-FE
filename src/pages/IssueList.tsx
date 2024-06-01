import React, { useState , useEffect } from 'react';
import Container from "../components/Container.tsx";
import "../css/list.css";
import serchIcon from "../assets/search.png"
import { useNavigate, useParams } from "react-router-dom";
import { getIssue, searchIssue } from "../apis/apis.ts"

interface Issue {
  id: number;
  title: string;
  status: number;
  reportedDate : string;
  dueDate : string;
}

const IssueStatue = ['NEW', 'ASSIGNED', 'FIXED', 'RESOLVED', 'CLOSED', 'REOPENED']
const ProjectStatus = ['Not Started', 'In Progress', 'Done']
const ProjectAccountRole = ['PL', 'DEV', 'TESTER']
const searchFilters = ['title', 'description', 'keyword', 'reporter', 'manager', 'assignee', 'fixer', 'priority', 'status']

const IssueList: React.FC = () => {
    //프로젝트 리스트에서 클릭한 것을 project 아이디를 토대로 가져온다
    const {projectId} = useParams<{ projectId: string | undefined}>();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [currentPage, handlePageChange] = useState(1);
    const [listNum, setlistNum] = useState(5);
    const [isSearch, clickSearch] = useState(false);
    const [viewProjectInfo, onviewProjectInfo] = useState(false);
    const nav = useNavigate();

    const [projectTitle, setTitle] = useState("");
    const [projectDescription, setDescription] = useState("")
    const [projectDate, setDate] = useState("")
    const [projectStatus, setStatus] = useState("")
    const [projectPL, setPL] = useState("");
    const [projectDEV, setDEV] = useState("");
    const [projectTESTER, setTESTER] = useState("");
    const [issues, setIssues] = useState<Issue[]>([]);
    
    //테스터 계정 활성화/비활성화
    const [isTester, checkTester] = useState(false)

    //프로젝트가 어떻게 나오는지 예시

    const [issueView, setIssueView] = useState<Issue[]>([]);
    const [filterView, setfilterView] = useState<Issue[]>([]);

    useEffect(() => {
        const loadIssues = async() => {
            try{
                if(projectId!==undefined) {
                    //서버에서 데이터 가져와서 저장
                    const data = await getIssue(parseInt(projectId, 10));
                    console.log(data.accountRole);
                    console.log(data);
                    if(data.accountRole === 2){
                        checkTester(true)
                    }
                    setTitle(data.projectTitle)
                    setDescription(data.projectDescription)
                    setDate(data.projectDate)
                    setStatus(data.projectStatus)
                    for(let i=0;i<data.projectMember.length;i++){
                        switch(data.projectMember[i].role){
                            case 0:
                                setPL(projectPL+data.projectMember[i].username)
                                break
                            case 1:
                                setDEV(projectDEV+data.projectMember[i].username)
                                break
                            case 2:
                                setTESTER(projectTESTER+data.projectMember[i].username)
                                break
                        }
                    }
                    setIssues(data.issue)

                    //refresh 하면 첫 이슈부터 보여줌
                    setIssueView(data.issue.slice(listNum*(currentPage-1), listNum*(currentPage)))
                    setfilterView(data.issue)
                }
            }catch(err){
                console.error(""+err)
            }
        }
    
        loadIssues();
        // 페이지 변경될때마다 마운트
    }, [listNum, projectId, currentPage]);

    useEffect(()=>{
        const search = async() => {
            try{
                if(projectId!==undefined) {
                    if(searchFilter==="" || searchTerm ===""){
                        return
                    }
                    //서버에서 데이터 가져와서 저장
                    const data = await searchIssue(parseInt(projectId, 10), searchFilter, searchTerm);
                    setIssues(data)
                    //refresh 하면 첫 이슈부터 보여줌
                    setIssueView(issues.slice(listNum*(currentPage-1), listNum*(currentPage)))
                    setfilterView(issues)
                }
            }catch(err){
                console.error(""+err)
            }
        }
        if(isSearch){
            clickSearch(false);    
            search()
        }
        
    }, [isSearch, projectId, searchFilter, searchTerm, listNum, currentPage]);

    // createIssue 페이지로 가도록 네비게이션
    const createIssue = () => {
        nav(`/projects/${projectId}/issues/issuecreate`)
    };

    //검색 버튼을 눌렀을떄 수행
    const handleSearch = () => {
        // 검색 로직 추가
        // 실제 검색 로직을 여기서 수행
        clickSearch(true);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    //화면상에 보이는 issue 숫자 설정
    const listSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setlistNum(Number(e.target.value));
        handlePageChange(1);
        setIssueView(filterView.slice(Number(e.target.value)*0, Number(e.target.value)*1))
    };

    //필터 적용
    const filtering_status = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handlePageChange(1);
        const status = Number(e.target.value)
        if(status>-1){
            const filter_result = issues.filter(issue => issue.status == status)
            setIssueView(filter_result.slice(listNum*0, listNum*1))
            setfilterView(filter_result)
        }else{
            setfilterView(issues)
            setIssueView(issues.slice(listNum*0, listNum*1))
        }
    };

    //검색 필터 설정
    const search_filter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handlePageChange(1);
        const status = Number(e.target.value)
        setSearchFilter(searchFilters[status])
    };

    return (
        <Container>
            <div>
                <h2 className='main-title'>
                    Issue 
                        <label className='sub-title' onClick={()=>onviewProjectInfo(!viewProjectInfo)}>
                            / {projectTitle}
                        </label>
                        {viewProjectInfo && (
                            <div className = 'project-info' style={{ 
                                border: '1px solid #ccc', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                marginTop: '10px', 
                                backgroundColor: 'white', 
                                position: 'absolute', 
                                top: '180px', 
                                left: '250px',
                                zIndex: 10
                              }}>
                                <p><strong>Project Status:{projectStatus}</strong></p>
                                <p><strong>Project Date:{projectDate}</strong></p>
                                <p><strong>Member:</strong></p>
                                {projectPL!==""&&<p>PL - {projectPL}</p>}
                                {projectDEV!==""&&<p>Dev - {projectDEV}</p>}
                                {projectTESTER!==""&&<p>Tester - {projectTESTER}</p>}
                                <p><strong>Description:</strong> {projectDescription}</p>
                          </div>
                        )}
                </h2>
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
                        <select className="list-veiw" onChange={search_filter}>
                            <option value="0">title</option>
                            <option value="1">description</option>
                            <option value="2">keyword</option>
                            <option value="3">reporter</option>
                            <option value="4">manager</option>
                            <option value="5">assignee</option>
                            <option value="6">fixer</option>
                            <option value="7">priority</option>
                            <option value="8">status</option>
                        </select>
                        <select className="list-veiw" onChange={filtering_status}>
                            <option value="-1">any</option>
                            <option value="0">new</option>
                            <option value="1">assigned</option>
                            <option value="2">fixed</option>
                            <option value="3">resolved</option>
                            <option value="4">closed</option>
                            <option value="5">reopened</option>
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
                    <th style={{width: '15%'}}>Status</th>
                    <th className = 'dateStart' style={isTester?{width: '20%'}:{width: '27%'}}>Start date</th>
                    <th className = 'create'>
                        Due date
                        {isTester && (
                            <button onClick={createIssue}>+ Create Issue</button>
                        )}
                    </th>
                </tr>
                </thead>
                <tbody>
                {issueView.map(issue => (
                    <tr key={issue.id} onClick={()=>nav(`/projects/${projectId}/issues/`+issue.id)}>
                    <td>{issue.title}</td>
                    <td>{IssueStatue[issue.status]}</td>
                    <td>{issue.reportedDate}</td>
                    <td>{issue.dueDate}</td>
                    </tr>
                ))}
                    <tr></tr>
                </tbody>
                </table>
                <div className="pagination">
                    {currentPage>1?<span onClick={() => {handlePageChange(currentPage - 1); setIssueView(filterView.slice(listNum*(currentPage-2), listNum*(currentPage-1)))}}>
                        &lt;</span>:<span>&lt;</span>}
                    {currentPage}
                    {currentPage<Math.ceil(filterView.length/listNum)?<span onClick={() => {handlePageChange(currentPage + 1); setIssueView(filterView.slice(listNum*(currentPage), listNum*(currentPage+1)))}}>
                        &gt;</span>:<span>&gt;</span>}
                </div>
            </div>
        </Container>
    );
};

export default IssueList