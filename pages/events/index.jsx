import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL, PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';

const EventsPage = ({ events, page, eventTotal }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events?.length === 0 ? <h3> No Event Found</h3> : events.map((evt) => <EventItem key={evt.id} evt={evt} />)}

      <Pagination page={page} eventTotal={eventTotal} />
    </Layout>
  );
};

export default EventsPage;

export const getServerSideProps = async ({ query: { page = 1 } }) => {
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  const response = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);
  const events = await response.json();

  const eventCountRes = await fetch(`${API_URL}/events/count`);
  const eventTotal = await eventCountRes.json();

  return {
    props: {
      events,
      page: +page,
      eventTotal,
    },
  };
};
