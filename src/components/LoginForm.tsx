import { useState } from "react";
import { postLogin } from "../apis/apis";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const login_data = await postLogin(username, password);

      if (login_data === 200) {
        setError("로그인 성공");
        nav('/projectlist');
        // onLogin(username, password);
        // 로그인 성공 처리
      } else {
        setError(""+login_data);
        
      }
    } catch (error) {
      console.error('Error:', error);
      setError(""+error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
