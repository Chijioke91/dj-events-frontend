import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '@/components/Layout';
import styles from '@/styles/Event.module.css';
import { API_URL } from '@/config/index';
import EventMap from '@/components/EventMap';

const EventPage = ({ evt }) => {
  return (
    <Layout>
      <div className={styles.event}>
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

        <EventMap evt={evt} />

        <Link href="/events">
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
};

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

export default EventPage;
