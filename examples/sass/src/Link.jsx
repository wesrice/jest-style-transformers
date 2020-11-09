import PropTypes from 'prop-types';
import * as React from 'react';

const Link = (props) => <a href="#">{props.children}</a>;

Link.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Link;
