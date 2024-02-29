import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="w3-bar w3-purple">
      <Link to="/home" className="w3-bar-item w3-button w3-large">D.I.V.I.N.E. Passage</Link>
      <div className="w3-right">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          <Link className="w3-bar-item w3-button" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="w3-bar-item w3-button" to="/user">Home</Link>
            <Link className="w3-bar-item w3-button" to="/info">Info Page</Link>
            <Link className="w3-bar-item w3-button" to="/service_partner">Service Partner Page</Link>
            {/* Assuming LogOutButton is adaptable to being styled by W3.CSS */}
            <LogOutButton className="w3-bar-item w3-button" />
          </>
        )}

        <Link className="w3-bar-item w3-button" to="/about">About</Link>
      </div>
    </div>
  );
}

export default Nav;
