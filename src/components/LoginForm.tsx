import { useState } from "react";
import { postLogin } from "../apis/apis";
import { useNavigate } from "react-router-dom";
import styles from '../css/login.module.css';

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
        nav('/projects');
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
    <div className={styles.loginWrapper}>
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input className={styles.input}
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div >
          <input className={styles.input}
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.loginbutton} type="submit">Login</button>
        <button className={styles.loginbutton} onClick={() => nav('/users/signup')}>Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
