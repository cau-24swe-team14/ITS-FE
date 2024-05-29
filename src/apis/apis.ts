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

const instance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const postSignup = async (username: string, password: string) => {
  try{
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/users/signup`,{
      username,
      password,
    });
    return response.status;
  } catch (error) {
    console.error('faile to signup:', error);
    throw error;
  }
}

export const postLogin = async (username:string, password:string) => {
  try {
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/users/login`,{
      username,
      password,
    });
    return response.status;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
}

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

export const getProject = async () => {
  try{
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects`);
    const data = response.data;
    console.log('Received projects data:', data); 

    const projects = {
      isAdmin: data.isAdmin,
      project : data.project
    };
    return projects;

  } catch (error) {
    console.error('Failed to fetch projects:', error);
    throw error;
  }
};


