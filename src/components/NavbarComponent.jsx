import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="text-white px-4" style={{ backgroundColor: '#ad171c' }}> {/* Đổi nền bằng mã màu #ad171c */}
      {/* <Navbar.Brand href="#home">YourBrand</Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/home" className="text-white">Trang chủ</Nav.Link>
          <Nav.Link href="/grade" className="text-white">Xem điểm</Nav.Link>
          <Nav.Link href="/introduce" className="text-white">Giới thiệu</Nav.Link>
        </Nav>
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-light" className="">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
