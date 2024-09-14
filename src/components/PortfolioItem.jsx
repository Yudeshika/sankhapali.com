import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import './PortfolioItem.css';

const PortfolioItem = ({ project }) => {
  return (
    <Card className="portfolio-item my-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h2>{project.name}</h2>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <Carousel showThumbs={false} dynamicHeight={true}>
              {project.screenshots.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`Screenshot ${index + 1}`} className="img-fluid rounded"/>
                </div>
              ))}
            </Carousel>
          </Col>
          <Col md={6}>
            <h4>Highlights</h4>
            <ListGroup variant="flush">
              {project.highlights.map((highlight, index) => (
                <ListGroup.Item key={index}>{highlight}</ListGroup.Item>
              ))}
            </ListGroup>
            <h4 className="mt-4">Technologies Used</h4>
            <div className="d-flex flex-wrap">
              {project.technologies.map((tech, index) => (
                <div key={index} className="d-flex align-items-center mr-3 mb-2">
                  {tech.icon}
                  <span className="ml-2">{tech.name}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default PortfolioItem;
