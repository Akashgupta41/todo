import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerSuccess } from "../src/slice/auth";
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Todo from './components/Todo';
import Footer from './components/Footer';
import Users from './components/Users';

// Secure Route for authenticated users
const PrivateRoute = ({ children }) => {
  const AuthUser = localStorage.getItem('token');
  if (!AuthUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

// Secure Route for admin users
const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.register.user);
  const isAdmin = user?.isAdmin;
  if (!isAdmin) {
    // Redirect to home if not an admin
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(registerSuccess(JSON.parse(user)));
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/todos' element={
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          } />
          <Route path='/admin/users' element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          } />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
