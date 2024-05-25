import React, { useState } from 'react';
import Container from "../components/Container.tsx";
import "../css/list.css";
import serchIcon from "../assets/search.png"
import { useNavigate, useParams } from "react-router-dom";

interface Issue {
  id: number;
  title: string;
  status: number;
  startDate : string;
  dueDate : string;
}

const IssueStatue = ['NEW', 'ASSIGNED', 'FIXED', 'RESOLVED', 'CLOSED', 'REOPENED']

const IssueList: React.FC = () => {
    //프로젝트 리스트에서 클릭한 것을 project 아이디를 토대로 가져온다
    const {projectid} = useParams<{projectid : string}>();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, handlePageChange] = useState(1);
    const [listNum, setlistNum] = useState(5);
    const [viewProjectInfo, onviewProjectInfo] = useState(false);
    const nav = useNavigate();
    
    //테스터 계정 활성화/비활성화
    const isTester = true

    //프로젝트가 어떻게 나오는지 예시
    const [issues, setIssues] = useState<Issue[]>([
        { id: 1, title: 'Project Alpha', status: 2, startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 2, title: 'Project Beta', status: 0 , startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 3, title: 'Project Gamma', status: 1 , startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 4, title: 'Project Gamma', status: 2 , startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 5, title: 'Project Gamma', status: 1 , startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 6, title: 'Project Gamma', status: 3 , startDate: '2021-05-30', dueDate:'2022-03-12' },
        { id: 7, title: 'Project Gamma', status: 4 , startDate: '2021-05-30', dueDate:'2022-03-12' },
    ]);

    const [issueView, setIssueView] = useState(issues.slice(listNum*(currentPage-1), listNum*(currentPage)));
    const [filterView, setfilterView] = useState(issues);

    // createIssue 페이지로 가도록 네비게이션
    const createIssue = () => {
        
    };

    //검색 버튼을 눌렀을떄 수행
    const handleSearch = () => {
        // 검색 로직 추가
        // 실제 검색 로직을 여기서 수행
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

    return (
        <Container>
            <div>
                <h2 className='main-title'>
                    Issue 
                        <label className='sub-title' onClick={()=>onviewProjectInfo(!viewProjectInfo)}>
                            / {projectid}
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
                                <p><strong>Member:</strong></p>
                                <p>PL - PL1, PL2</p>
                                <p>Dev - Dev1, Dev2, Dev3, Dev4, Dev5, ..</p>
                                <p>Tester - Tester1, Tester2, Tester3, Tester4, 많으면 줄바꿈돼서 내려감</p>
                                <p><strong>Description:</strong> 최대 20자 정도</p>
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
                    <tr key={issue.id} onClick={()=>nav(`/issueDetail/`+issue.id)}>
                    <td>{issue.title}</td>
                    <td>{IssueStatue[issue.status]}</td>
                    <td>{issue.startDate}</td>
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