import { useState, useEffect } from "react"
import { getIssueStatics } from "../apis/apis";
import { INewProps, IClosedProps, ITopProps, IBestProps } from "./IStatics";
import { useParams, useNavigate } from "react-router-dom";

export default function IssueStatics() {
    const { projectId } = useParams<{projectId : any}>();
    const [selectedItem, setSelectedItem] = useState('');
    const [staticsdata, setStaticsData] = useState<any>(null);
    const [newData, setNewData] = useState<INewProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [closedData, setClosedData] = useState<IClosedProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [topData, setTopData] = useState<ITopProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [bestData, setBestData] = useState<IBestProps>({ weekly: { data: { pl: { username: "", count: 0 }, dev: { username: "", count: 0 }, tester: { username: "", count: 0 } } } });
    const nav = useNavigate();

    const setHandlePage = ( projectId: number, issueId: number) => {
        nav(`/projects/${projectId}/issues/${issueId}`);
    };
    
    useEffect(() => {
        async function fetchStaticsData() {
            try {
                if (!projectId) throw new Error('projectId is undefined');

                let value = '';
                if (selectedItem === 'IDaily' || selectedItem === 'IMonthly') {
                    value = 'new-issue';
                } else if (selectedItem === 'CDaily' || selectedItem === 'CMonthly') {
                    value = 'closed-issue';
                } else if (selectedItem === 'TDaily' || selectedItem === 'TMonthly') {
                    value = 'best-issue';
                } else {
                    value = 'best-member';
                }
                const data = await getIssueStatics(projectId, value);
                setStaticsData(data);

                if (selectedItem === 'IDaily' || selectedItem === 'IMonthly') {
                    setNewData(data);
                } else if (selectedItem === 'CDaily' || selectedItem === 'CMonthly') {
                    setClosedData(data);
                } else if (selectedItem === 'TDaily' || selectedItem === 'TMonthly') {
                    setTopData(data);
                } else {
                    setBestData(data);
                }
            } catch (error) {
                console.error('Failed to load issue data:', error);
            }
        }

        if (selectedItem) {
            fetchStaticsData();
        }
    }, [selectedItem]);

    const getContentForSelectedItem = () => {        
        switch (selectedItem) {
          case 'IDaily':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Daily Data</p>
                    {newData && newData.daily.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`날짜: ${item.date}, new issue 개수: ${item.count}`}
                        {index !== newData.daily.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>
                    ))}
                </div>
            );
          case 'IMonthly':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Monthly Data</p>
                    {newData && newData.monthly.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`날짜: ${item.date}, new issue 개수: ${item.count}`}
                        {index !== newData.monthly.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>                    
                    ))}
                </div>
            );
          case 'CDaily':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Daily Data</p>
                    {closedData && closedData.daily.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`날짜: ${item.date}, closed issue 개수: ${item.count}`}
                        {index !== closedData.daily.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>
                    ))}
                </div>
            );
          case 'CMonthly':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Monthly Data</p>
                    {closedData && closedData.monthly.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`날짜: ${item.date}, closed issue 개수: ${item.count}`}
                        {index !== closedData.monthly.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>
                    ))}
                </div>
            );
          case 'PL':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">PL Data</p>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.pl && (
                        <p className="mx-[20px] my-[10px] text-[18px]">{`사용자: ${bestData.weekly.data.pl.username}, manager로 등록된 issue 개수: ${bestData.weekly.data.pl.count}`}</p>
                    )}
                </div>
            );
          case 'Dev':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Dev Data</p>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.dev && (
                        <p className="mx-[20px] my-[10px] text-[18px]">{`사용자: ${bestData.weekly.data.dev.username}, assignee로 등록된 issue 개수: ${bestData.weekly.data.dev.count}`}</p>
                    )}
                </div>
            );
          case 'Tester':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Tester Data</p>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.tester && (
                        <p className="mx-[20px] my-[10px] text-[18px]">{`사용자: ${bestData.weekly.data.tester.username}, reporter로 등록된 issue 개수: ${bestData.weekly.data.tester.count}`}</p>

                    )}
                </div>
            );
          case 'TDaily':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Daily Data</p>
                    {topData && topData.daily.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`제목: ${item.title}, comment 개수: ${item.count}`}
                        <button className="bg-white text-black hover:text-gray-500 text-[18px] mx-[20px] p-0 hover:border-white" onClick={() => setHandlePage(projectId, item.issueId)}>View Issue</button>
                        {index !== topData.daily.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>
                    ))}
                </div>
            );
          case 'TMonthly':
            return (
                <div>
                    <p className="mx-[15px] my-[15px] font-semibold">Monthly Data</p>
                    {topData && topData.monthly.data.map((item:any, index:number) => (
                        <p className="mx-[20px] my-[10px] text-[18px]" key={index}>{`제목: ${item.title}, comment 개수: ${item.count}`}
                        <button className="bg-white text-black hover:text-gray-500 text-[18px] mx-[20px] p-0 hover:border-white" onClick={() => setHandlePage(projectId, item.issueId)}>View Issue</button>
                        {index !== topData.monthly.data.length - 1 && <hr className="my-[10px]"/>}
                        </p>
                    ))}
                </div>
            );
          default:
            return (
                <div className="mx-[15px] my-[15px] text-[18px]">
                    선택된 항목이 없습니다.
                </div>
            );
        }
      };

      const getTitle = () => {
        switch (selectedItem) {
            case 'IDaily':
            case 'IMonthly':
                return 'Issue Count';
            case 'CDaily':
            case 'CMonthly':
                return 'Closed Issue';
            case 'TDaily':
            case 'TMonthly':
                return 'Top3 Issue';
            case 'PL':
            case 'Dev':
            case 'Tester':
                return 'Best';
            default:
                return 'Issue Statics';
        }
      }

    return(
        <div className="flex flex-row">
            <div className="bg-[#D9D9D9] w-[200px] h-fit mr-[15px] rounded-[5px] flex flex-col p-[16px]">
                {/* Issue Count Section */}
                <div className="font-bold mb-[8px] cursor-default">Issue Count</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('IDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('IMonthly')}>Monthly</div>
                </div>
                
                {/* Closed Issue Section */}
                <div className="font-bold mb-[8px] cursor-default">Closed Issue</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('CDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('CMonthly')}>Monthly</div>
                </div>
                
                {/* Best Section */}
                <div className="font-bold mb-[8px] cursor-default">Best</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('PL')}>PL</div>
                    <div onClick={() => setSelectedItem('Dev')}>Dev</div>
                    <div onClick={() => setSelectedItem('Tester')}>Tester</div>
                </div>
                
                {/* Top 3 Issue Section */}
                <div className="font-bold mb-[8px] cursor-default">Top3 Issue</div>
                <div className="ml-[8px] cursor-pointer">
                    <div onClick={() => setSelectedItem('TDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('TMonthly')}>Monthly</div>
                </div>
            </div>
            <div className="w-[1026px] h-[617px] border border-black rounded-[5px]">
                <div className="flex items-center bg-[#F9F9F9] w-full h-[44px] border-b border-black px-[26px]">
                    <span className="font-semibold text-[16px]">{getTitle()}</span>
                </div>
                    <span className="text-[20px]">{getContentForSelectedItem()}</span>
            </div>

        </div>
    )
}