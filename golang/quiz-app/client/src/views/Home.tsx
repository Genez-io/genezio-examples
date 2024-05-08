import React, { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {Category} from "../models/typeHome";

// Define the component for the Home page
export default function Home() {
  // State variables to manage form inputs and data
  const [name, setName] = useState<string>(""); // Player's name
  const [selectCategory, setSelectCategory] = useState<string>(""); // Selected category ID
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(""); // Selected difficulty level
  const [categories, setCategories] = useState<Category[]>([]); // Available categories
  const [error, setError] = useState<string>(""); // Form submission error
  const navigate = useNavigate();

  // Fetch categories from API on component mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("https://opentdb.com/api_category.php");
        const data = await response.json();
        setCategories(data.trivia_categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !selectCategory) {
      setError("All fields are mandatory");
      return;
    }

    // Store selected data in localStorage
    localStorage.setItem("playerName", name);
    localStorage.setItem("selectCategory", selectCategory);
    localStorage.setItem("selectedDifficulty", selectedDifficulty);

    // Redirect to questions page
    navigate("/questions");

    setError(""); // Clear error message
  };

  return (
    <Container className="mt-5">
      <Row className="mt-5">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card className="p-4 mt-5">
            <div className="auth-wrapper">
              <div className="auth-inner">
                <form onSubmit={handleSubmit}>
                  <h1 className="text-center mb-5">Quiz APP</h1>
                  {error && <span className="text-danger">{error}</span>}
                  <div className="mb-3 mt-4">
                    <Input
                      className="form-control"
                      placeholder="Player name"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control"
                      autoComplete="select"
                      value={selectCategory}
                      onChange={(e) => setSelectCategory(e.target.value)}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-control"
                      autoComplete="select"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      <option value="">Select a difficulty</option>
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div className="text-center mt-5">
                    <Button type="submit" color="primary">
                      GET STARTED
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
