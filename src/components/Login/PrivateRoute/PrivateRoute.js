const React = require('react');
const { Navigate } = require('react-router-dom');
const { useContext } = require('react');
const jwt_decode = require("jwt-decode");
const { AuthContext } = require('../../Context/AuthContext');

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  const isLoggedIn = () => {
    const token = sessionStorage.getItem('access_token');
    if (!token) {
      return false;
    }
    const decodedToken = jwt_decode(token);
    const currentTime = new Date().getTime() / 1000;
    return decodedToken.exp > currentTime;
  }

  return user.email ? children : <Navigate to="/login" />;
};

module.exports = PrivateRoute;
