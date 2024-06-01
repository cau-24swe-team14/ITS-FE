import { useState } from "react";
import Container from "../components/Container.tsx";
import { createProject, getUser } from "../apis/apis.ts";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  role: number;
}

const roleName = ["PL", "Dev", "Tester"];

function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const nav = useNavigate();

  const addUser = async () => {
    try {
      const user = await getUser(username);
      if (user) {
        const isUserExists = users.some((u) => u.username === username);
        if (!isUserExists) {
          setUsers(users => [...users, { username: username, role: role }]);
          setUsername(""); // 입력 필드 초기화
          setRole(0); // 입력 필드 초기화
        } else {
          console.error("User already exists");
        }
      } else {
        console.error("User not found");
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    }
  };


  const handleCreateProject = async () => {
    try {
      const data = await createProject(projectName, projectDescription, users);

      console.log("프로젝트 생성:", data.data);
      const location = data.headers.location; 
      nav(location);
    } catch (err) {
      console.error("" + err);
    }
  };

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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="flex flex-row items-center">
                        <label className="text-[20px] mr-[15px]">Role:</label>
                        <select
                          className="w-[285px] h-[39px] border border-black rounded-[5px]"
                          value={role}
                          onChange={(e) => setRole(Number(e.target.value))}>
                            <option value="0">PL</option>
                            <option value="1">Dev</option>
                            <option value="2">Tester</option>
                        </select>
                    </div>
                    <button
                          className="w-[100px] h-[43px] hover:bg-[#D9D9D9] hover:text-black bg-black text-white rounded-[5px] font-semibold text-[15px]"
                          onClick={ addUser }>add
                        </button>
                </div>
                <table className="mx-[50px] mb-[30px]">
                    <thead>
                        <tr>
                            <th className="w-1/2">Username</th>
                            <th className="w-1/3">Role</th>
                            {/* <th>State</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
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
    </Container>
  );
}

export default ProjectCreate;