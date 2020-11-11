import PropTypes from 'prop-types';
import * as React from 'react';
import Link from './Link';
import styles from './Heading.module.scss';

const Header = (props) => (
  <h1 className={styles.h1}>
    <Link>{props.children}</Link>
  </h1>
);

Header.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Header;
