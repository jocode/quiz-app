import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Home = () => (
  <Fragment>
    <Helmet><title>Quiz App - Home</title></Helmet>
    <div id="home">
      <section>
        <div style={{ textAlign: 'center' }}>
          <span className="mdi mdi-cube-outline cube"></span>
        </div>
        <h1>Quiz App</h1>

        <div className="play-button-container">
          <ul>
            <li><Link className="play-button" to="/play/instructions">Play</Link></li>
          </ul>
        </div>

        <div className="auth-container">
          <Link className="auth-button" id="login-button" to="/login">Login</Link>
          <Link className="auth-button" id="signup-button" to="/register">Register</Link>
        </div>
      </section>
    </div>
  </Fragment>
);

export default Home;