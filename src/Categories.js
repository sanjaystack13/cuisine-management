import React, { useState } from "react";
import { Form, Button, Card, Row, Col, ListGroup, DropdownButton, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Categories.css";
import data from './data.json'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const cuisines = data?.cuisines
  const subcategories = data?.subcategories

  const navigate = useNavigate();

  const handleCategory = (e) => {
    e.preventDefault();

    if (!title || selectedCuisines.length === 0 || selectedSubcategories.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }

    const newCategory = {
      title,
      image: image ? URL.createObjectURL(image) : null,
      cuisines: selectedCuisines,
      subcategories: selectedSubcategories,
    };

    setCategories([...categories, newCategory]);

    setTitle("");
    setImage(null);
    setSelectedCuisines([]);
    setSelectedSubcategories([]);
  };

  return (
    <div>
      <h2>Categories</h2>
      <Card className="CardCategories">
        <Card.Body>
          <Form onSubmit={handleCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category title"
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
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Cuisines</Form.Label>
              <DropdownButton
                variant="light"
                title={selectedCuisines.length > 0 ? selectedCuisines.join(", ") : "Select Cuisines"}
                className="w-100"
              >
                {cuisines.map((cuisine, index) => (
                  <Dropdown.Item
                    key={index}
                    as="button"
                    type="button" 
                    onClick={() =>
                      setSelectedCuisines((prev) =>
                        prev.includes(cuisine)
                          ? prev.filter((item) => item !== cuisine)
                          : [...prev, cuisine]
                      )
                    }
                  >
                    {cuisine}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Select Subcategories</Form.Label>
              <DropdownButton
                variant="light"
                title={selectedSubcategories.length > 0 ? selectedSubcategories.join(", ") : "Select Subcategories"}
                className="w-100"
              >
                {subcategories?.map((subcategory, index) => (
                  <Dropdown.Item
                    key={index}
                    as="button"
                    type="button" 
                    onClick={() =>
                      setSelectedSubcategories((prev) =>
                        prev.includes(subcategory)
                          ? prev.filter((item) => item !== subcategory)
                          : [...prev, subcategory]
                      )
                    }
                  >
                    {subcategory}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Add Category
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Row>
        {categories.map((cat, index) => (
          <Col key={index} sm={12} md={6} lg={4} className="mb-4">
            <Card className="categorieslist">
              {cat.image && (
                <Card.Img
                  variant="top"
                  src={cat.image}
                  alt={cat.title}
                  className="category-image"
                />
              )}
              <Card.Body>
                <Card.Title>{cat.title}</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>Cuisines: {cat.cuisines.join(", ")}</ListGroup.Item>
                  <ListGroup.Item>
                    Subcategories: {cat.subcategories.join(", ")}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row>
        <Col>
          <Button variant="success" onClick={() => navigate("/")}>
            Go to Cuisines
          </Button>
        </Col>
        <Col>
          <Button variant="info" onClick={() => navigate("/Subcategories")}>
            Go to Subcategories
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Categories;
