import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

const EventsPage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 ? <h3> No Event Found</h3> : events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
    </Layout>
  );
};

export default EventsPage;

export const getStaticProps = async () => {
  const response = await fetch(`${API_URL}/api/events`);
  const events = await response.json();

  return {
    props: {
      events,
      revalidate: 1,
    },
  };
};
