import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container.tsx";
import "../css/App.css";
import { updateProject } from "../apis/apis.ts";

function ProjectUpdate() {
  const { projectid } = useParams<{ projectid: string }>();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleUpdateProject = async () => {
    try {
      await updateProject(projectid, projectName, projectDescription);
      console.log("프로젝트 업데이트:", projectid);
    } catch (err) {
      console.error("" + err);
    }
  };

  return (
    <Container>
      <h2>Edit Project</h2>
      <button onClick={handleUpdateProject}>save</button>
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
    </Container>
  );
}

export default ProjectUpdate;
