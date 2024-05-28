import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../apis/apis';

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
        nav('/projectlist');
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
    <div>
      <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
