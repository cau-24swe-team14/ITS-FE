import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../apis/apis';
import styles from '../css/login.module.css';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    try {
      const data = await postSignup(username, password);

      if (data === 201) {
        // 회원가입 성공 처리
        alert('Signup successful');
        nav('/projects');
      } else {
        // 회원가입 실패 처리
        setError('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred during signup.');
    }
  };

  return (
    <div className={styles.loginWrapper}>
    <div className={styles.loginContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.input}
            type="text"
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className={styles.input}
            type="password"
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button className={styles.signupbutton} type="submit">Sign Up</button>
      </form>
    </div>
    </div>
  );
};

export default SignupForm;
