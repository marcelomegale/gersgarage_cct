import React from 'react';
import { Navbar, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const MyMenu = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <Navbar color="light" light expand="md">
      <Navbar.Brand href="#home">My Website</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#about">About</NavLink>
          </NavItem>
          <Dropdown nav inNavbar isOpen={dropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle nav caret>
              Dropdown
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#option1">Option 1</DropdownItem>
              <DropdownItem href="#option2">Option 2</DropdownItem>
              <DropdownItem href="#option3">Option 3</DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="#option4">Option 4</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyMenu;
