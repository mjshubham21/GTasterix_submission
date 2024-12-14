import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  // validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    setError(""); // Reset error message

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BASE_URL}jwt/login`;  // API URL for login
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),  // Send email and password
      });

      const data = await response.json();
      console.log("LOGIN DATA::", data);
      
      if (response.ok) {
        localStorage.setItem("token", data.token);  // Store JWT token
        console.log("Login successful: ", data);
        navigate("/");  // Redirect to home page
        setLoading(false);
      } else {
        setError(data.message || "Login failed. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6} sm={12}>
            <Card>
              <Card.Body>
                <h3 className="text-center mb-4">Login</h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      isInvalid={validated && !validateEmail(email)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      isInvalid={validated && !validatePassword(password)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters long.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={loading} block>
                    {loading ? "Logging in..." : "Submit"}
                  </Button>
                </Form>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                <div className="text-center mt-3">
                  <span>Don't have an account? </span>
                  <Button variant="link" onClick={() => navigate("/register")}>
                    Register here
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
