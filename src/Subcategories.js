import React, { useState } from "react";
import {
  Form,
  Button,
  Card,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import "./Subcategories.css";
import { useNavigate } from "react-router-dom";
import data from "./data.json";

const Subcategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [title, setTitle] = useState("");
  const categories = data.categories;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();

  const handleSubCategory = (e) => {
    e.preventDefault();
    setSubCategories((prev) => [
      ...prev,
      { title, categories: selectedCategories },
    ]);
    setTitle("");
    setSelectedCategories([]);
  };

  const handleCategorySelection = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((cat) => cat !== category);
      }
      return [...prev, category];
    });
  };

  return (
    <div>
      <h2 className="text-center mb-4">Sub categories</h2>
      <Card className="subcategories">
        <Card.Body>
          <Form onSubmit={handleSubCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Subcategory Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subcategory title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Categories</Form.Label>
              <Dropdown>
                <DropdownButton
                  variant="light"
                  id="dropdown-basic-button"
                  title="Choose Categories"
                >
                  {categories.map((cat, index) => (
                    <Dropdown.Item
                      key={index}
                      as="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategorySelection(cat);
                      }}
                    >
                      {cat}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Dropdown>
              <div className="selected-categories">
                {selectedCategories.length > 0
                  ? `Selected: ${selectedCategories.join(", ")}`
                  : "No categories selected"}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Add Subcategory
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {subCategories?.map((subcat, index) => (
          <Col key={index} sm={12} md={6} lg={4}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{subcat.title}</Card.Title>
                <Card.Text>
                  Categories: {subcat.categories.join(", ")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
        <Col>
          <Button variant="success" onClick={() => navigate("/Categories")}>
            Go to Categories
          </Button>
        </Col>
        <Col>
          <Button variant="info" onClick={() => navigate("/")}>
            Go to Cuisines
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Subcategories;
