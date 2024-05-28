import { useState, useEffect } from "react"
import { getIssueStatics } from "../apis/apis";
import { INewProps, IClosedProps, ITopProps, IBestProps } from "./IStatics";

export default function IssueStatics() {
    const [selectedItem, setSelectedItem] = useState('');
    const [staticsData, setStaticsData] = useState<any>(null);
    const [newData, setNewData] = useState<INewProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [closedData, setClosedData] = useState<IClosedProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [topData, setTopData] = useState<ITopProps>({ daily: { data: [] }, monthly: { data: [] } });
    const [bestData, setBestData] = useState<IBestProps>({ weekly: { data: { PL: [], DEV: [], TESTER: [] } } });

    useEffect(() => {
        async function fetchStaticsData() {
            try {
                const projectId = 1;
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
                    {newData?.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'IMonthly':
            return (
                <div>
                    <h2>Monthly Data</h2>
                    {newData?.monthly.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'CDaily':
            return (
                <div>
                    <h2>Daily Data</h2>
                    {closedData?.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'CMonthly':
            return (
                <div>
                    <h2>Monthly Data</h2>
                    {closedData?.monthly.data.map((item:any, index:number) => (
                        <li key={index}>{`날짜: ${item.date}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'PL':
            return (
                <div>
                    <h2>PL Data</h2>
                    {bestData?.weekly.data.PL.map((item:any, index:number) => (
                        <li key={index}>{`사용자: ${item.username}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'Dev':
            return (
                <div>
                    <h2>Dev Data</h2>
                    {bestData?.weekly.data.DEV.map((item:any, index:number) => (
                        <li key={index}>{`사용자: ${item.username}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'Tester':
            return (
                <div className="mx-[20px]">
                    <h2>Tester Data</h2>
                    {bestData?.weekly.data.TESTER.map((item:any, index:number) => (
                        <li key={index}>{`사용자: ${item.username}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'TDaily':
            return (
                <div>
                    <div>Daily Data</div>
                    {topData?.daily.data.map((item:any, index:number) => (
                        <li key={index}>{`제목: ${item.title}, 개수: ${item.count}`}</li>
                    ))}
                </div>
            );
          case 'TMonthly':
            return (
                <div>
                    <h2>Daily Data</h2>
                    {topData?.monthly.data.map((item:any, index:number) => (
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