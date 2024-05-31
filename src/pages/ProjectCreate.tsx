import { useState } from "react";
import Container from "../components/Container.tsx";
import { createProject } from "../apis/apis.ts";

interface User {
  username: string;
  role: number;
}

const roleName = [
  'PL',
  'Dev',
  'Tester'
];

function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchRole, setSearchRole] = useState("");
  
  const [users, setUsers] = useState<User[]>([
    { username: "PL1", role: 0 },
    { username: "PL2", role: 0 },
    { username: "Dev1", role: 1 },
    { username: "Dev2", role: 1 },
    { username: "Tester1", role: 2}
  ]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [assignees, setAssignees] = useState<User[]>([]);

  const handleCheckboxChange = (user: User) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(user)) {
        return prevSelectedUsers.filter(selectedUser => selectedUser !== user);
      } else {
        return [...prevSelectedUsers, user];
      }
    });
  };

  const addUser = () => {
    setAssignees([...selectedUsers]);
  };

  const handleCreateProject = async () => {
    try {
      const data = await createProject(projectName, projectDescription, assignees);

      console.log("프로젝트 생성:", data);
    } catch (err) {
      console.error("" + err);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (!searchUsername ||
        user.username.toLowerCase().includes(searchUsername.toLowerCase())) &&
      (!searchRole || user.role === parseInt(searchRole))
    );
  });

  return (
    <Container>
      <div className="my-[80px] mx-[60px]">
        <div className="flex justify-between mb-[27px]">
            <span className="text-[36px] font-semibold">New Project</span>
            <button 
                className="w-[144px] h-[44px] hover:bg-[#D9D9D9] hover:text-black bg-black text-white rounded-[5px] font-semibold" 
                onClick={handleCreateProject}>Create
            </button>
        </div>
        <div className="mx-[34px]">
          <h3 className="text-[24px] mb-[20px]">Project Setting</h3>
          <div className="py-[20px] px-[47px] w-[1222px] bg-[#F9F9F9] border border-[#747474] rounded-[10px]">
            <div className="flex flex-row">
              <div className="flex flex-col">
              <label className="text-[20px]">Name:</label>
              <input
                className="my-[15px] border border-black w-[512px] h-[39px] rounded-[5px]"
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <label className="text-[20px] mt-[10px]">Description:</label>
              <input
                className="my-[15px] border border-black w-[512px] h-[39px] rounded-[5px]"
                type="text"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
              </div>
              <div className="mx-[20px]"></div>
              <label className="text-[20px]">Assignees:</label>
              <table className="mx-[30px] my-[30px] mb-[30px]">
                    <thead>
                        <tr>
                            <th className="w-1/3">Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignees.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{roleName[user.role]}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </div>
        </div>
        <div className="mt-[50px] mx-[34px]">
          <h3 className="text-[24px] mb-[20px]">Assign User</h3>
            <div className="px-[40px] w-[1222px] bg-[#F9F9F9] border border-[#747474] rounded-[10px]">
                <div className="flex flex-row justify-between px-[50px] py-[30px]">
                    <div className="flex flex-row items-center ">
                        <label className="text-[20px] mr-[15px]">Username:</label>
                        <input
                          className="w-[285px] h-[39px] border border-black rounded-[5px]"
                          type="text"
                          value={searchUsername}
                          onChange={(e) => setSearchUsername(e.target.value)} />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="text-[20px] mr-[15px]">Role:</label>
                        <select
                          className="w-[285px] h-[39px] border border-black rounded-[5px]"
                          value={searchRole}
                          onChange={(e) => setSearchRole(e.target.value)}>
                            <option value="">All Roles</option>
                            <option value="0">PL</option>
                            <option value="1">Dev</option>
                            <option value="2">Tester</option>
                        </select>
                    </div>
                    <button
                          className="w-[100px] h-[49px] hover:bg-[#D9D9D9] hover:text-black bg-black text-white rounded-[5px] font-semibold text-[15px]"
                          onClick={ addUser }>save
                        </button>
                </div>
                <table className="mx-[50px] mb-[30px]">
                    <thead>
                        <tr>
                            <th className="w-1/2">Username</th>
                            <th className="w-1/3">Role</th>
                            <th>Assigned</th>
                            {/* <th>State</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{user.username}</td>
                            <td>{roleName[user.role]}</td>
                            <td>
                              <input
                                className="mb-[10px]"
                                type="checkbox"
                                checked={selectedUsers.includes(user)}
                                onChange={() => handleCheckboxChange(user)}
                              />
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </Container>
  );
}

export default ProjectCreate;