import { useState } from "react";
import Container from "../components/Container.tsx";
import "../css/App.css";
import { createProject } from "../apis/apis.ts";

function ProjectCreate() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [users, setUsers] = useState([
    { username: "PL1", role: "PL" },
    { username: "PL2", role: "PL" },
    { username: "Dev1", role: "Dev" },
    { username: "Dev2", role: "Dev" },
  ]);

  const addUser = () => {
    if (username && role) {
      setUsers([
        ...users,
        {
          username: username,
          role: role,
        },
      ]);
      setUsername("");
      setRole("");
    }
  };

  const handleCreateProject = async () => {
    // 프로젝트 생성 로직을 여기에 추가하세요
    try {
      const data = await createProject(projectName, projectDescription, users);

      console.log("프로젝트 생성:", data);
    } catch (err) {
      console.error("" + err);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      (!searchUsername ||
        user.username.toLowerCase().includes(searchUsername.toLowerCase())) &&
      (!searchRole || user.role === searchRole)
    );
  });

  return (
    <Container>
      <div className="App">
        <h2>New Project</h2>
        <button onClick={handleCreateProject}>Create</button>
        <div className="project-setting">
          <h3>Project Setting</h3>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="add-user">
          <h3>Add User</h3>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              value={searchRole}
              onChange={(e) => setSearchRole(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="PL">PL</option>
              <option value="Dev">Dev</option>
              <option value="Tester">Tester</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <button
                  onClick={() => {
                    setUsername(user.username);
                    setRole(user.role);
                    addUser();
                  }}
                >
                  Add User
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default ProjectCreate;
