import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  Card,
  Container,
  Row,
  Col,
  ListGroup,
} from "react-bootstrap";
import "./Cuisines.css";

const Cuisines = () => {
  const [cuisines, setCuisines] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleCuisine = (e) => {
    e.preventDefault();
    const newCuisine = { title, image: URL.createObjectURL(image) };
    setCuisines([...cuisines, newCuisine]);
    setTitle("");
    setImage(null);
  };

  return (
    <div>
      <Container fluid>
        <h2 className="text-center mb-4">Cuisines Management</h2>

        <Card className="cardfront">
          <Form onSubmit={handleCuisine}>
            <Form.Group>
              <Form.Label>Cuisine Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Cuisine Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              Add Cuisine
            </Button>
          </Form>
        </Card>

        {cuisines.length > 0 && (
          <Row>
            {cuisines.map((cuisine, index) => (
              <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                <Card className="cardlist">
                  {cuisine.image && (
                    <Card.Img
                      variant="top"
                      src={cuisine.image}
                      alt={cuisine.title}
                      className="cuisine-image"
                    />
                  )}
                  <Card.Body>
                    <Card.Title>Cuisine:{cuisine.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        <Row>
          <Col>
            <Button
              variant="success"
              onClick={() => navigate("/Categories")}
              className="w-100"
            >
              Go to Categories
            </Button>
          </Col>
          <Col>
            <Button
              variant="info"
              onClick={() => navigate("/Subcategories")}
              className="w-100"
            >
              Go to Subcategories
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cuisines;
