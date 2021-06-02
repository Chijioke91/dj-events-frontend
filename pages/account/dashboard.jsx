import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';

const DashboardPage = ({ events, token }) => {
  const router = useRouter();
  const onDelete = async (id) => {
    if (confirm('Are you sure about this?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      router.reload();
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>User Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} onDelete={() => onDelete(evt.id)} />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
};

export default DashboardPage;
