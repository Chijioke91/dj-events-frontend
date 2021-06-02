import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';
import { parseCookie } from '@/helpers/index';

const AddEventPage = ({ token }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const { name, performers, address, venue, date, time, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(formData).some((val) => val === '');

    if (hasEmptyFields) {
      return toast.error('Please fill out all fields');
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        return toast.error('You are Not Authorized to Perform this Action');
      }

      return toast.error('Something Went Wrong');
    }

    const evt = await res.json();

    router.push(`/events/${evt.slug}`);
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input type="text" id="name" name="name" value={name} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input type="text" name="performers" id="performers" value={performers} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input type="text" name="venue" id="venue" value={venue} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" name="address" id="address" value={address} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" name="date" id="date" value={date} onChange={onChange} />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" value={time} onChange={onChange} />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea type="text" name="description" id="description" value={description} onChange={onChange}></textarea>
        </div>

        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export const getServerSideProps = async ({ req }) => {
  const { token } = parseCookie(req);

  return {
    props: {
      token,
    },
  };
};

export default AddEventPage;
