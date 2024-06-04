import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../components/Container.tsx";
import { updateProject, getIssue, getUser } from "../apis/apis.ts"; // getUser API 추가

interface User {
  username: string;
  role: number;
}

interface Issue {
  title: string;
  description: string;
  member: User[];
}

const roleName = ["PL", "Dev", "Tester"];

function ProjectUpdate() {
  const { projectId } = useParams<{ projectId: string | undefined }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [originData, setOriginData] = useState<Issue | null>(null);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [newUsers, setNewUsers] = useState<User[]>([]);
  const nav = useNavigate();

  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) {
        console.error("Invalid project ID");
        return;
      }
      try {
        const projectIdNumber = parseInt(projectId);
        const issues = await getIssue(projectIdNumber);
        const projectData: Issue = {
          title: issues.projectTitle,
          description: issues.projectDescription,
          member: issues.projectMember,
        };
        setTitle(projectData.title);
        setDescription(projectData.description);
        setUsers(projectData.member);
        setOriginData(projectData);
      } catch (err) {
        console.error("Failed to fetch project members" + err);
      }
    };

    loadProjectData();
  }, [projectId]);

  const handleUpdateProject = async () => {
    if (!projectId || !originData) return;
  
    try {
      const projectIdNumber = parseInt(projectId);
  
      const updatedMembers = [...users, ...newUsers];
      const updatedFields = {
        title: title !== originData.title ? title : originData.title,
        description: description !== originData.description ? description : originData.description,
        member: updatedMembers,
      };
  
      console.log("Updated Fields:", updatedFields);
  
      await updateProject(projectIdNumber, updatedFields);
  
      console.log("프로젝트 업데이트:", projectId, updatedFields);
  
      setUsers(updatedMembers);
      setNewUsers([]);

      nav(`/projects/${projectId}`);
    } catch (err) {
      console.error("프로젝트 업데이트 실패: " + err);
    }
  };
  

  const addUser = async () => {
    if (username && role) {
      try {
        const user = await getUser(username);
        if (user) {
          const newUser: User = {
            username: username,
            role: roleName.indexOf(role),
          };
  
          const isExistingUser = users.some(
            (user) => user.username === newUser.username
          );
  
          const isNewUser = newUsers.some(
            (user) => user.username === newUser.username
          );
  
          if (!isExistingUser && !isNewUser) {
            setNewUsers((prevNewUsers) => [...prevNewUsers, newUser]);
            console.log("New User Added: ", newUser);
            console.log("Updated New Users List: ", [...newUsers, newUser]);
          } else if (isExistingUser) {
            console.log("User already exists: ", newUser);
          } else {
            console.log("User already added: ", newUser);
          }
        } else {
          console.log("User not found: ", username);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
  
      setUsername("");
      setRole("");
    } else {
      console.log("Username or role is empty.");
    }
  };
  

  return (
    <Container>
      <div className="my-[50px] mx-[60px]">
        <div className="flex justify-between mb-[27px]">
          <h2 className="text-[36px] font-semibold">Edit Project</h2>
          <button
            className="w-[144px] h-[44px] hover:bg-[#D9D9D9] hover:text-black bg-black text-white rounded-[5px] font-semibold"
            onClick={handleUpdateProject}
          >
            Save
          </button>
        </div>
        <div className="mx-[34px]">
          <h3 className="text-[24px] mb-[20px]">Project Setting</h3>
          <div className="py-[20px] px-[47px] w-[1222px] bg-[#F9F9F9] border border-[#747474] rounded-[10px]">
            <div className="flex flex-col">
              <label>Name:</label>
              <input
                className="my-[15px] border border-black w-[512px] h-[39px] rounded-[5px]"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Description:</label>
              <input
                className="my-[15px] border border-black w-[512px] h-[39px] rounded-[5px]"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-[50px] mx-[34px]">
          <h3 className="text-[24px] mb-[20px]">Add User</h3>
          <div className="px-[40px] w-[1222px] bg-[#F9F9F9] border border-[#747474] rounded-[10px]">
            <div className="flex flex-row justify-between px-[50px] py-[30px]">
              <div className="flex flex-row items-center">
                <label className="text-[20px] mr-[15px]">Username:</label>
                <input
                  className="w-[285px] h-[39px] border border-black rounded-[5px]"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="flex flex-row items-center">
                <label className="text-[20px] mr-[15px]">Role:</label>
                <select
                  className="w-[285px] h-[39px] border border-black rounded-[5px]"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="PL">PL</option>
                  <option value="Dev">Dev</option>
                  <option value="Tester">Tester</option>
                </select>
              </div>
              <button
                className="w-[100px] h-[39px] hover:bg-[#D9D9D9] hover:text-black bg-black text-white rounded-[5px] font-semibold text-[15px]"
                onClick={addUser}
              >
                Add
              </button>
            </div>
            <table className="mx-[50px] mb-[30px]">
              <thead>
                <tr>
                  <th className="w-1/3">Username</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {[...newUsers, ...users].map((user, index) => (
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

export default ProjectUpdate;
