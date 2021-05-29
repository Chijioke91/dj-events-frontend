import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

const SearchPage = ({ events }) => {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {events?.length === 0 ? <h3> No Event Found</h3> : events.map((evt) => <EventItem key={evt.id} evt={evt} />)}
    </Layout>
  );
};

export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({ _where: { _or: [{ name_contains: term }, { performers_contains: term }, { venue_contains: term }, { description_contains: term }] } });
  const response = await fetch(`${API_URL}/events?${query}`);
  const events = await response.json();

  return {
    props: {
      events,
    },
  };
};

export default SearchPage;
