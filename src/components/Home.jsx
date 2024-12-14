import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal, ModalHeader, ModalBody, ModalTitle, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 

const Home = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [employees, setEmployees] = useState([
    // Sample employee data
    { id: 1, firstName: 'Shubham', lastName: 'Pawar', birthDate: '2000-02-11', email: 'mjshubhampawar21@gmail.com', mobileNo: '1234567890', role: 'USER', shopName: 'Shop 1' },
    { id: 2, firstName: 'Wakanda', lastName: 'ForEver', birthDate: '1234-02-11', email: 'valar@morghulis.com', mobileNo: '9876543210', role: 'USER', shopName: 'Shop 2' }
  ]);
  const [validated, setValidated] = useState(false);
  const [viewEmployeeDetails, setViewEmployeeDetails] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');  // Redirect to login if no token is found
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);
    setAddEmployee(true);
    console.log('Employee added');
    setAddEmployee(false);
  };

  const handleAddEmployee = () => {
    setAddEmployee(true);
  };

  const handleView = (employee) => {
    setViewEmployeeDetails(true);
    setEmployeeDetails(employee);
  };

  const handleCloseError = () => setError(null);

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <h3 className="mt-2">Employee Details</h3>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Birth Date</th>
                  <th>Email</th>
                  <th>Mobile No</th>
                  <th>Role</th>
                  <th>Shop Name</th>
                  <th>Salary Details</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.birthDate}</td>
                    <td>{employee.email}</td>
                    <td>{employee.mobileNo}</td>
                    <td>{employee.role}</td>
                    <td>{employee.shopName}</td>
                    <td>
                      <Button variant="primary" onClick={() => handleView(employee)}>View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="success" onClick={handleAddEmployee}>Add Employee</Button>
          </Col>
        </Row>

        {/* Add Employee Form Modal */}
        {addEmployee && (
          <Row>
            <Col>
              <Modal show={addEmployee} onHide={() => setAddEmployee(false)}>
                <ModalHeader closeButton>
                  <ModalTitle>Add Employee</ModalTitle>
                </ModalHeader>
                <ModalBody>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formFirstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control required type="text" placeholder="Enter first name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control required type="text" placeholder="Enter last name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBirthDate">
                      <Form.Label>Birth Date</Form.Label>
                      <Form.Control required type="date" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control required type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formMobileNo">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control required type="text" placeholder="Enter mobile no" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Control required type="text" placeholder="Enter role" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formShopName">
                      <Form.Label>Shop Name</Form.Label>
                      <Form.Control required type="text" placeholder="Enter shop name" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>
          </Row>
        )}

        {/* Modal for employee details */}
        {viewEmployeeDetails && (
          <Modal show={viewEmployeeDetails} onHide={() => setViewEmployeeDetails(false)}>
            <ModalHeader closeButton>
              <ModalTitle>Employee Details</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>First Name: {employeeDetails?.firstName}</p>
              <p>Last Name: {employeeDetails?.lastName}</p>
              <p>Birth Date: {employeeDetails?.birthDate}</p>
              <p>Email: {employeeDetails?.email}</p>
              <p>Mobile No: {employeeDetails?.mobileNo}</p>
              <p>Role: {employeeDetails?.role}</p>
              <p>Shop Name: {employeeDetails?.shopName}</p>
            </ModalBody>
          </Modal>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" onClose={handleCloseError} dismissible className="mt-3">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Home;
