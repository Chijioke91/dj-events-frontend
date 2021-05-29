import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '@/styles/Search.module.css';

const Search = () => {
  const router = useRouter();
  const [term, setTerm] = useState('');

  const onChange = (e) => setTerm(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  return (
    <div className={styles.search}>
      <form onSubmit={onSubmit}>
        <input type="text" id="term" value={term} onChange={onChange} placeholder="Search Events" />
      </form>
    </div>
  );
};

export default Search;
