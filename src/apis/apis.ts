////////////////////////////////////////
//
//  - API 형식 참고용!
//
////////////////////////////////////////




///////////////////////////////////////
//
//  NOTIFICATION
//
//  - 함수 작성 시 함수 작성한 사람 명 기재
//  - BACKEND 의 API 로직을 보고 수정해야함
//
//  - Error Handling, refreshToken 은
//  구현이 안되어있으므로 아직은 API 만
//
///////////////////////////////////////



import axios from "axios";
// import { ISignupProps } from "../pages/Signup"
// import { ILoginDataProps } from "../pages/Login";

const instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getIssueStatics = async (projectId: number, value: string) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/trend?category=${value}`);
    return response.data;
  } catch(error) {
    console.error('Failed to fetch statics:', error);
    throw error;
  }
};

const keywordMapping = ["BUG", "FEATURE", "PERFORMANCE", "SECURITY", "UI", "DB", "INTEGRATION", "NETWORK", "API", "DOCS"];
const priorityMapping = ["BLOCKER", "CRITICAL", "MAJOR", "MINOR", "TRIVIAL"];
const statusMapping = ["NEW", "ASSIGNED", "FIXED", "RESOLVED", "CLOSED", "REOPENED"];

export const getIssueDetail = async (projectId:number, issueId:number) => {
  try{
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`);
    const data = response.data;
    console.log('Received issue data:', data); 

    const issue = {
      accountRole: data.accountRole,
      id: data.id,
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      keyword: keywordMapping[data.keyword],
      reporter: data.reporter,
      reportedDate: data.reportedDate,
      manager: data.manager,
      assignee: data.assignee,
      fixer: data.fixer,
      priority: priorityMapping[data.priority],
      status: statusMapping[data.status],
      dueDate: data.dueDate,
      closedDate: data.closedDate,
      comment: data.comment 
    };
    return issue;

  } catch (error) {
    console.error('Failed to fetch issue:', error);
    throw error;
  }
};

export const postComment = async (projectId: number, issueId: number, comment: { content: string }) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}/comments`, comment);
    return response.data;
  } catch (error) {
    console.error('Error posting issue:', error);
    throw error;
  }
  
};

export const postIssue = async (projectId: number, issueData : any) => {
  try {
    const postResponse = await instance.post(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues`, issueData);
    return postResponse;
  } catch (error) {
    console.error('Error posting issue:', error);
    throw error;
  }
};

export const fetchIssue = async (projectId: number, issueId: number) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching issue data:', error);
    throw error;
  }
};

export const patchIssue = async (projectId: number, issueId: number, issueData : any) => {
  try {
    const patchResponse = await instance.patch(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`, issueData);
    return patchResponse;
  } catch (error) {
    console.error('Error patching issue:', error);
    throw error;
  }
};


// /**
//  * @param data login interface
//  * @returns 로그인 요청 API 함수 (POST)
//  */
// export function postLogin(data: ILoginDataProps) {
//   const url = `${import.meta.env.VITE_BASE_URL}/wee/user/login`;
//   return instance.post(url, data);
// }

// /**
//  * @returns 회원가입 요청 API 함수 (POST)
//  */
// export function postSignup(data: ISignupProps) {
//   const url = `${import.meta.env.VITE_BASE_URL}/wee/user/register`;
//   return instance.post(url, data);
// }


/**
 * SJW 2024.03.06
 * 크루 모집방 조회 (GET)
 */

// export const getCrew = async () => {
//   const response = await axios.get("/CrewExample.json");
//    return response.data.data || [];
// };

export const getCrew = async () => {
  try{
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew/list`;
    const response = await axios.get(url);
    const crewData = response.data.data || [];
    return crewData;
  } catch (error) {
    console.error('Error fetchig crew:', error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 크루 모집방 추가 (POST)
 */
// export const postCrew = async (crewId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, startDate: Date, endDate: Date, location: string, type: string, headcount: number, status: string) => {
//   try {
//     // 서버에서 가장 최근에 추가된 crewId 값을 가져옵니다.
//     const response = await axios.get("/CrewExample.json");
//     const data = response.data.data;
//     const lastCrew = data[data.length - 1];
//     const lastCrewId = lastCrew ? lastCrew.crewId : 0; // 마지막 crewId 값이 없으면 0으로 초기화합니다.

//     // 새로운 crewId 값을 계산합니다.
//     const newCrewId = lastCrewId + 1;

//     // 새로운 데이터를 서버에 추가합니다.
//     const postResponse = await axios.post("/CrewExample.json", {
//       crewId: newCrewId,
//       userId,
//       title,
//       contents,
//       like,
//       createDate,
//       viewCnt,
//       commentCnt,
//       startDate,
//       endDate,
//       location,
//       type,
//       headcount,
//       status,
//     });

//     return postResponse;
//   } catch (error) {
//     console.error('Error posting crew:', error);
//     throw error;
//   }
// };

export const postCrew = async (crewData: any) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew`;
    const postResponse = await axios.post(url, crewData);
    return postResponse;
  } catch (error) {
    console.error('Error posting crew:', error);
    throw error;
  }
};

export const postCrew1 = async (crewId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, startDate: Date, endDate: Date, location: string, type: string, headcount: number, status: string) => {
  try {
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/crew`;
    // 서버에서 가장 최근에 추가된 crewId 값을 가져옵니다.
    // const response = await axios.get(url);
    // const data = response.data.data;
    // const lastCrew = data[data.length - 1];
    // const lastCrewId = lastCrew ? lastCrew.crewId : 0; // 마지막 crewId 값이 없으면 0으로 초기화합니다.

    // // 새로운 crewId 값을 계산합니다.
    // const newCrewId = lastCrewId + 1;

    // 새로운 데이터를 서버에 추가합니다.
    const postResponse = await axios.post(url, {
      crewId,
      userId,
      title,
      contents,
      like,
      createDate,
      viewCnt,
      commentCnt,
      startDate,
      endDate,
      location,
      type,
      headcount,
      status,
    });

    return postResponse;
  } catch (error) {
    console.error('Error posting crew:', error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 운동 루틴방 조회 (GET)
 */
export const getShare = async () => {
  try{
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/share/list`;
    const response = await axios.get(url);
    const shareData = response.data.data || [];
    return shareData;
  } catch (error) {
    console.error('Error fetchig crew:', error);
    throw error;
  }
};


/**
 * SJW 2024.03.06
 * 운동 루틴방 추가 (POST)
 */
export const postShare = async (shareId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number) => {
  const response = await axios.post('/ShareExample.json', {
    shareId,
    userId,
    title,
    contents,
    like,
    createDate,
    viewCnt,
    commentCnt,
  });
  return response;
};

/**
 * SJW 2024.03.06
 * 운동 질문방 조회 (GET)
 */
export const getQuestion = async () => {
  try{
    const url = `${import.meta.env.VITE_BASE_URL}/wee/comm/question/list`;
    const response = await axios.get(url);
    const questionData = response.data.data || [];
    return questionData;
  } catch (error) {
    console.error('Error fetchig crew:', error);
    throw error;
  }
};

/**
 * SJW 2024.03.06
 * 운동 질문방 추가 (POST)
 */
export const postQuestion = async (questionId: number, userId: number, title: string, contents: string, like: number, createDate: Date, viewCnt: number, commentCnt: number, type: string, status: string) => {
  const response = await axios.post('/QuestionExample.json', {
    questionId,
    userId,
    title,
    contents,
    like,
    createDate,
    viewCnt,
    commentCnt,
    location,
    type,
    status,
  });
  return response;
};