import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import { FaImage } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import styles from '@/styles/Form.module.css';
import { API_URL } from '@/config/index';
import ImageUpload from '@/components/ImageUpload';
import { parseCookie } from '@/helpers/index';

const EditEventPage = ({ evt, token }) => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const { name, performers, address, venue, date, time, description } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(formData).some((val) => val === '');

    if (hasEmptyFields) {
      return toast.error('Please fill out all fields');
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      return toast.error('Something Went Wrong');
    }

    const savedEvt = await res.json();

    router.push(`/events/${savedEvt.slug}`);
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = await res.json();
    console.log(data);
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Edit Event">
      <Link href="/events">Go Back</Link>
      <h1>Edit Event</h1>
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
            <input type="date" name="date" id="date" value={moment(date).format('YYYY-MM-DD')} onChange={onChange} />
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

        <input type="submit" value="Update Event" className="btn" />
      </form>
      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <p>No Image Uploaded</p>
        </div>
      )}

      <div>
        <button className="btn-secondary" onClick={() => setShowModal(true)}>
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} token={token} />
      </Modal>
    </Layout>
  );
};

export const getServerSideProps = async ({ params: { id }, req }) => {
  const { token } = parseCookie(req);
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: {
      evt,
      token,
    },
  };
};

export default EditEventPage;
