import Link from 'next/link';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import styles from '@/styles/Header.module.css';
import Search from './Search';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DJ events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <Link href="/account/login">
                  <button onClick={logout} className="btn-icon btn-secondary">
                    <FaSignOutAlt />
                    Logout
                  </button>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/account/login">
                <a className="btn-icon btn-secondary">
                  <FaSignInAlt />
                  Login
                </a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
