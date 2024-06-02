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

export const getUser = async (username: string) => {
  try{
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/users/isExist?username=${username}`);
    return response;
  } catch (error: any) {
    console.error('user not found:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
  }
}

export const postSignup = async (username: string, password: string) => {
  try{
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/users/signup`,{
      username,
      password,
    });
    return response.status;
  } catch (error:any) {
    console.error('faile to signup:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
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
  } catch (error:any) {
    console.error('Failed to login:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
}

export const postLogout = async () => {
  try {
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {});
    return response.status;
  } catch (error:any) {
    console.error('Failed to logout:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
}

export const getIssueStatics = async (projectId: number, value: string) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/trend?category=${value}`);
    return response.data;
  } catch(error:any) {
    console.error('Failed to fetch statics:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

const keywordMapping = ["BUG", "FEATURE", "PERFORMANCE", "SECURITY", "UI", "DB", "INTEGRATION", "NETWORK", "API", "DOCS"];
const priorityMapping = ["BLOCKER", "CRITICAL", "MAJOR", "MINOR", "TRIVIAL"];
const statusMapping = ["NEW", "ASSIGNED", "FIXED", "RESOLVED", "CLOSED", "REOPENED"];

export const getIssueDetail = async (projectId:number, issueId:number) => {
  try{
    const data = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`);

    console.log('Received issue data:', data); 

    const issue = {
      accountRole: data.data.accountRole,
      id: data.data.id,
      projectId: data.data.projectId,
      title: data.data.title,
      description: data.data.description,
      keyword: keywordMapping[data.data.keyword],
      reporter: data.data.reporter,
      reportedDate: data.data.reportedDate,
      manager: data.data.manager,
      assignee: data.data.assignee,
      fixer: data.data.fixer,
      priority: priorityMapping[data.data.priority],
      status: statusMapping[data.data.status],
      dueDate: data.data.dueDate,
      closedDate: data.data.closedDate,
      comment: data.data.comment 
    };
    return issue;

  } catch (error:any) {
    console.error('Failed to fetch issue:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const postComment = async (projectId: number, issueId: number, comment: { content: string }) => {
  try {
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}/comments`, comment);
    return response.data;
  } catch (error:any) {
    console.error('Error posting issue:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
  
};

export const postIssue = async (projectId: number, issueData : any) => {
  try {
    const response = await instance.post(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues`, issueData);
    return response;
  } catch (error:any) {
    console.error('Error posting issue:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const fetchIssue = async (projectId: number, issueId: number) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`);
    return response.data;
  } catch (error:any) {
    console.error('Error fetching issue data:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const patchIssue = async (projectId: number, issueId: number, issueData : any) => {
  try {
    const patchResponse = await instance.patch(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}`, issueData);
    return patchResponse;
  } catch (error:any) {
    console.error('Error patching issue:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
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

  } catch (error:any) {
    console.error('Failed to fetch projects:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const getIssue = async (projectId:number) => {
  try{
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}`);
    const data = response.data;
    
    const projects = {
      accountRole: data.accountRole,
      projectId : data.id,
      projectTitle : data.title,
      projectDescription : data.description,
      projectDate : data.date,
      projectStatus : data.status,
      projectMember : data.member,
      issue : data.issue
    };
    return projects;

  } catch (error:any) {
    console.error('Failed to fetch issues:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const getProjectMembers = async (projectId: number) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}`);
    const data = response.data;
    
    const members = data.member;
    return members;

  } catch (error:any) {
    console.error('Failed to fetch project members:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const searchIssue = async (projectId:number, key:string, value:string) => {
  try{
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues?${key}=${value}`);
    const data = response.data;
    return data;

  } catch (error:any) {
    console.error('Failed to search issues:', error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const createProject = async (name: string, description: string, users: Array<object>,) => {
  //이가연
  try {
    const project = {
      title: name,
      description: description,
      member: users
    };
    const response = await instance.post(
      `${import.meta.env.VITE_BASE_URL}/projects`,
      project,
    );

    const data = response;
    console.log("Post new project data:", data);

    return data;
  } catch (error:any) {
    console.error("Failed to fetch projects:", error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const updateProject = async (projectId: number, projectData: { title: string, description: string, member: Array<object> }) => {
  try {
    await instance.patch(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}`, projectData);

    console.log("Patch new project data:", projectId);
    return;
  } catch (error:any) {
    console.error("Failed to update projects:", error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
};

export const getAssinee = async (projectId: number, issueId: number) => {
  try {
    const response = await instance.get(`${import.meta.env.VITE_BASE_URL}/projects/${projectId}/issues/${issueId}/assignee-suggestions`);
    const data = response.data;
    return data;
  } catch (error:any) {
    console.error("Failed to get Assginee: ", error);
    if (error.response) {
      alert(`${error.response.data}`);
    }
    throw error;
  }
}
