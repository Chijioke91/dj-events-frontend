import Head from 'next/head';
import styles from '@/styles/Layout.module.css';
import Footer from './Footer';
import Header from './Header';

const Layout = ({ title, description, keywords, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: 'DJ Events | Part with the coolest DJ',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, edm, events, party, DJ',
};
