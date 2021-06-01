import { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/AuthForm.module.css';
import Layout from '@/components/Layout';
import AuthContext from '@/context/AuthContext';

const LoginPage = () => {
  const { error, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };

  return (
    <Layout title="Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>
        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" value={email} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={onChange} name="password" />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Don't have an account <Link href="/account/register">Register</Link>
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
