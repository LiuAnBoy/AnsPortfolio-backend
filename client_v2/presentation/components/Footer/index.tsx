import { Typography } from '@mui/material';

import styles from '../../../styles/components/Footer.module.scss';

function Footer() {
  const Year = new Date().getFullYear();
  return (
    <section className={styles.footer}>
      <Typography variant="subtitle1" className={styles.typo}>
        COPYRIGHT &copy;2020 - {Year} <span>CLA</span> ALL RIGHTS RESERVED
      </Typography>
    </section>
  );
}

export default Footer;
