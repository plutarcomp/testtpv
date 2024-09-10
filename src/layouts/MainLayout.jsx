import PropTypes from 'prop-types';
import './mainlayout.css';
import { useAuthStore } from '../auth/authStorage';
import { Link } from '@tanstack/react-router';

const MainLayout = () => {

  //get data from zustand auth store
  const { user, token, role, id, program, email, logout, phone } = useAuthStore();
  console.log('Valores de zustand user', user);
  console.log('Valores de zustand token', token);
  console.log('Valores de zustand role', role);
  console.log('Valores de zustand id', id);
  console.log('Valores de zustand programa', program);
  console.log('Valores de zustand email', email);
  console.log('Valores de zustand phone', phone);

  console.log(program);

// change role value to a different string
  let roleValue = '';
  if (role === 'admin') {
    roleValue = 'Administrador';
  } else if (role === 'coach') {
    roleValue = 'Entrenador';
  } else if (role === 'user') {
    roleValue = 'Usuario';
  } else {
    roleValue = 'Usuario';
  }

  let urlLogin = '/zapopan-al-cubo/login';
  console.log('Valores de urlLogin:', urlLogin);
  return (
    <div className={`app-container`}>
      {/* Sidebar Toggle Button */}

      {/* Floating Sidebar */}
      <div className={`sidebar bg-dark text-light`}>
        <div className='sidebar-content'>
        <div className="sidebar-header text-center p-2">
          <img src="/images/logo.png" alt="Logo" className="img-fluid" />
          <div className="user-info mt-3">
            <div className='avatar'>
            <img src="https://i.pravatar.cc/300" alt="Logo" className="img-fluid" />
            </div>
            <h5 className="mt-2">{email}</h5>
            <p className="badge bg-success">{roleValue}</p>
          </div>
          <Link to={urlLogin} onClick={logout} className="btn btn-danger mt-3">Cerrar sesión</Link>
        </div>
        {/* <ul className="nav flex-column p-3">
          <li className="nav-item">
            <a className="nav-link active" href="#">Inicio</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Mis clases</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Clases disponibles</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Historial de clases</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Reservar clases</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Mi información</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Registrar hijo</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Mediciones</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Quejas al buzón</a>
          </li>
        </ul> */}
      </div>

      {/* Main content */}
      <div className="content flex-grow-1">
        {/* Top Navbar */}
        <div className="topbar d-flex justify-content-between align-items-center p-3 bg-white fixed-top">
          {/* <div className="breadcrumb">
            <p className="mb-0">Inicio <span className="text-muted">/ Buenos días 🔥</span></p>
          </div>
          <div className="search-box d-flex align-items-center">
            <input type="text" className="form-control" placeholder="Buscar..." />
            <div className="user-icons d-flex align-items-center ml-3">
              <i className="fa fa-bell"></i>
              <i className="fa fa-cog ml-3"></i>
              <i className="fa fa-user ml-3"></i>
            </div>
          </div> */}
        </div>

        {/* Main Content Area */}
        <div className="container mt-5 pt-5">
          
        </div>
      </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;