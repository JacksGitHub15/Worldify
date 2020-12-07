import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const NotFoundPage = () => {
  return (
    <>
      <Header />
      Page not found. Goto <Link to="/dashboard">Home Page</Link>
    </>
  );
};

export default NotFoundPage;
