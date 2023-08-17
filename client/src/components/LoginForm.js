import React, { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleLogin = () => {
    // Lógica de login...
    setIsUserLoggedIn(true); // Atualiza o estado do login
  };

  const handleLogout = () => {
    // Lógica de logout aqui
    setIsUserLoggedIn(false);
    localStorage.clear();
  };

  return (
    <div className="container-fluid user-profile">
      {/* Conteúdo do perfil do usuário */}
      {isUserLoggedIn ? (
        <div>
          {/* Exibir conteúdo do perfil do usuário logado */}
          <h3>Welcome John Doe</h3>
          <div>
          You have an appointment!
          </div>
          <div>
            What do you want to do?
            <ul>
                <li>
                    <Link to="/Booking">
                        - Schedule a service
                    </Link>
                </li>
                <li>- Edit your profile</li>
                <li>- Follow a service</li>
            </ul>
          </div>
          <Button color="danger" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      ) : (
        <div className="container-fluid GGloginForm">
          <div className="GGtitleCard">Welcome back</div>
          <Form>
            <div className='ProfileGG'>
                <div>Do sign in with profile</div>
                <FormGroup>
                    <select value={selectedOption} onChange={handleSelectChange} className="form-control">
                    <option value="">Brand</option>
                    <option value="Option 1">Customers</option>
                    <option value="Option 2">Staff</option>
                    <option value="Option 3">Manager</option>
                    </select>
                </FormGroup>
            </div>
            <FormGroup>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </FormGroup>
            <div className="GroupBut">
              <Button
                className="bot"
                color="warning"
                block
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
            <div className="text-center mt-3">
              <a href="/Register" className="link-primary">
                Don’t have a client profile? Click here
              </a>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
