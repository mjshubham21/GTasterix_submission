import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // States for registration
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [role, setRole] = useState('USER');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone); //phone validation for 10 digits
  const validatePassword = (password) => password.length >= 6; // Password length validation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    setError('');
    setSuccess('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    if (!validatePhone(mobileNo)) {
      setError('Please enter a valid 10-digit mobile number.');
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    const url = `${import.meta.env.VITE_BASE_URL}account/register`;
    try {
      const response = await axios.post(url, {
        name,
        email,
        mobileNo,
        roles: role,
        password,
        shopName,
      });

      setSuccess(response.data.message);
      setLoading(false);

      // Reset form
      setName('');
      setEmail('');
      setMobileNo('');
      setRole('USER');
      setPassword('');
      setShopName('');

      // Redirect to login page after successful registration
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <h1 className="text-center my-4">Create an Account</h1>
      <Row className="justify-content-center">
        <Col md={6}>
          {/* Success or error message */}
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={validated && !validateEmail(email)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMobileNo">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your mobile number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                isInvalid={validated && !validatePhone(mobileNo)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid 10-digit mobile number.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                required
                type="text"
                disabled
                placeholder="USER"
                value={role}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={validated && !validatePassword(password)}
              />
              <Form.Control.Feedback type="invalid">
                Password must be at least 6 characters long.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formShopName">
              <Form.Label>Shop Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your shop name"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please provide your shop name.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </Form>

          <div className="mt-3 text-center">
            <span>Already have an account? </span>
            <Button variant="link" onClick={() => navigate('/login')}>
              Login here
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
