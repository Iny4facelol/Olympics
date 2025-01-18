import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import ButtonCustom from '../../../../core/components/Button/Button'


const initialValues = {
  user_email: "",
  user_password: "",
}


export default function LoginUserForm() {
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      await fetchData(`api/user/login`, "post", formData)
    } catch (error) {
      console.error(error)
    }
  }




  return (
    <Form>
      <Row>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserEmail">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              className="custom-input"
              onChange={handleChange}
              value={formData.user_email}
              type="email"
              name="user_email"
              placeholder="Email"
            />
          </Form.Group>
        </Col>
        <Col md={6} sm={12}>
          <Form.Group controlId="formBasicUserPassword">
            <Form.Label>Password*</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="password"
              name="user_password"
              value={formData.user_password}
              placeholder="Contraseña"
            />
          </Form.Group>
        </Col>
      </Row>
      <div className='mt-4'>
        <ButtonCustom onClick={onSubmit} bgColor={"orange"}>Acceder</ButtonCustom>
      </div>
    </Form>
  );
}
