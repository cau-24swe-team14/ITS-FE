import { useState, useEffect } from "react"
import { getIssueStatics } from "../apis/apis";
import { INewProps, IClosedProps, ITopProps, IBestProps } from "./IStatics";
import { useParams } from "react-router-dom";

export default function IssueStatics() {
    const { projectId } = useParams<{projectId : any}>();
    const [selectedItem, setSelectedItem] = useState('');
    const [staticsData, setStaticsData] = useState<any>(null);
    const [newData, setNewData] = useState<INewProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [closedData, setClosedData] = useState<IClosedProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [topData, setTopData] = useState<ITopProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [bestData, setBestData] = useState<IBestProps>({ weekly: { data: { pl: { username: "", count: 0 }, dev: { username: "", count: 0 }, tester: { username: "", count: 0 } } } });

    useEffect(() => {
        async function fetchStaticsData() {
            try {
                if (!projectId) throw new Error('projectId is undefined');
                // const projectId = 1;
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
        if(!staticsData) return '데이터가 없습니다.';
        console.log(newData.daily.data);
        
        switch (selectedItem) {
          case 'IDaily':
            return (
                <div>
                    <h2>Daily Data</h2>
                    {newData && newData.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'IMonthly':
            return (
                <div>
                    <h2>Monthly Data</h2>
                    {newData && newData.monthly.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'CDaily':
            return (
                <div>
                    <h2>Daily Data</h2>
                    {closedData && closedData.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'CMonthly':
            return (
                <div>
                    <h2>Monthly Data</h2>
                    {closedData && closedData.monthly.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'PL':
            return (
                <div>
                    <h2>PL Data</h2>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.pl && (
                        <ul>
                            <li>{`사용자: ${bestData.weekly.data.pl.username}, 개수: ${bestData.weekly.data.pl.count}`}</li>
                        </ul>
                    )}
                </div>
            );
          case 'Dev':
            return (
                <div>
                    <h2>Dev Data</h2>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.dev && (
                        <ul>
                            <li>{`사용자: ${bestData.weekly.data.dev.username}, 개수: ${bestData.weekly.data.dev.count}`}</li>
                        </ul>
                    )}
                </div>
            );
          case 'Tester':
            return (
                <div>
                    <h2>Tester Data</h2>
                    {bestData && bestData.weekly && bestData.weekly.data && bestData.weekly.data.tester && (
                        <ul>
                            <li>{`사용자: ${bestData.weekly.data.tester.username}, 개수: ${bestData.weekly.data.tester.count}`}</li>
                        </ul>
                    )}
                </div>
            );
          case 'TDaily':
            return (
                <div>
                    <div>Daily Data</div>
                    {topData && topData.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`제목: ${item.title}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'TMonthly':
            return (
                <div>
                    <h2>Daily Data</h2>
                    {topData && topData.monthly.data.map((item:any, index:number) => (
                        <li key={index}>{`제목: ${item.title}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          default:
            return '선택된 항목이 없습니다.';
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
            <div className="bg-[#D9D9D9] w-[200px] h-fit mr-[15px] flex flex-col p-[16px]">
                {/* Issue Count Section */}
                <div className="font-semibold mb-[8px] cursor-default">Issue Count</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('IDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('IMonthly')}>Monthly</div>
                </div>
                
                {/* Closed Issue Section */}
                <div className="font-semibold mb-[8px] cursor-default">Closed Issue</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('CDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('CMonthly')}>Monthly</div>
                </div>
                
                {/* Best Section */}
                <div className="font-semibold mb-[8px] cursor-default">Best</div>
                <div className="ml-[8px] mb-[16px] cursor-pointer">
                    <div onClick={() => setSelectedItem('PL')}>PL</div>
                    <div onClick={() => setSelectedItem('Dev')}>Dev</div>
                    <div onClick={() => setSelectedItem('Tester')}>Tester</div>
                </div>
                
                {/* Top 3 Issue Section */}
                <div className="font-semibold mb-[8px] cursor-default">Top3 Issue</div>
                <div className="ml-[8px] cursor-pointer">
                    <div onClick={() => setSelectedItem('TDaily')}>Daily</div>
                    <div onClick={() => setSelectedItem('TMonthly')}>Monthly</div>
                </div>
            </div>
            <div className="w-[1026px] h-[617px] border border-black">
                <div className="flex items-center bg-[#F9F9F9] w-full h-[44px] border-b border-black px-[26px] mb-[16px]">
                    <span className="font-semibold text-[16px]">{getTitle()}</span>
                </div>
                    <span className="m-[16px]">{getContentForSelectedItem()}</span>
            </div>

        </div>
    )
}