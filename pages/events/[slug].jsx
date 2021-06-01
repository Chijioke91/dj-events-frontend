import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Layout from '@/components/Layout';
import styles from '@/styles/Event.module.css';
import { API_URL } from '@/config/index';

const EventPage = ({ evt }) => {
  const router = useRouter();
  const deleteEvent = async () => {
    if (confirm('Are you sure about this?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        return toast.error(data.message);
      }

      router.push(`/events`);
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(evt.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        <ToastContainer />

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.medium.url} height={600} width={960} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

export default EventPage;

// export const getServerSideProps = async (ctx) => {
//   const {
//     query: { slug },
//   } = ctx;
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const evt = await res.json();

//   return {
//     props: {
//       evt,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((evt) => ({
    params: { slug: evt.slug },
  }));
  return { paths, fallback: false };
};

export const getStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const evt = await res.json();

  return {
    props: {
      evt: evt[0],
      revalidate: 1,
    },
  };
};
