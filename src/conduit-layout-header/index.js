import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


function ConduitLayoutHeader(props) {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <div>
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link" href="/">
                {" "}
                Home{" "}
              </a>
            </li>
            {!isAuthenticated &&
              <li className="nav-item">
                <a className="nav-link" onClick={() => loginWithRedirect()}>

                  Sign in
                </a>
              </li>
            }
            {isAuthenticated &&
              <>
                <li className="nav-item"><a className="nav-link" href="/editor"><i className="ion-compose"></i>&nbsp;New Post</a></li>
                <li className="nav-item"><a className="nav-link" href="/settings"><i className="ion-gear-a"></i>&nbsp;Settings</a></li>
                <li className="nav-item">
                  <a className="nav-link" href="/@gcarrillo">
                    <img src="https://api.realworld.io/images/smiley-cyrus.jpeg" className="user-pic" alt="gcarrillo" />{user.email}</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={() => logout({ returnTo: `${window.location.origin}/logout` })}>
                    Logout
                  </a>
                </li></>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
};



export default ConduitLayoutHeader;
