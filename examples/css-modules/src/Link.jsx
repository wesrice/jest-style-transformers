import PropTypes from 'prop-types';
import * as React from 'react';
import styles from './Link.module.css';

const Link = (props) => (
  <a className={styles.a} href="#">
    {props.children}
  </a>
);

Link.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Link;
