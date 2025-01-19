import React from 'react';
import Sidebar from './Sidebar';
import NavbarComponent from './NavbarComponent';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid bg-light px-0"> {/* Thêm px-0 để bỏ padding trái phải */}
      <div className="row m-0"> {/* Thêm m-0 để bỏ margin */}
        {/* Sidebar */}
        <div className="col-md-3 d-none d-md-block px-0"> {/* Thêm px-0 để bỏ padding */}
          <Sidebar />
        </div>

        <div className="col-md-9 px-0"> {/* Thêm px-0 để bỏ padding */}
          <NavbarComponent />
          <div className="row">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
