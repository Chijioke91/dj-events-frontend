import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';

const RegisterPage = () => {
  const { register, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: '', email: '', password: '', password2: '' });
  const { username, email, password, password2 } = formData;

  useEffect(() => error && toast.error(error));

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      return toast.error('Passwords do not match');
    }

    register({ username, email, password });
  };

  return (
    <Layout title="Register">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Register
        </h1>
        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={username} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={onChange} name="password" />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input type="password" value={password2} onChange={onChange} name="password2" />
          </div>

          <input type="submit" value="Register" className="btn" />
        </form>

        <p>
          Already have an account <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  );
};

export default RegisterPage;
