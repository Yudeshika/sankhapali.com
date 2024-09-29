import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Container, Row, Col, ListGroup, Card } from 'react-bootstrap';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import './PortfolioItem.css';

const PortfolioItem = ({ project }) => {
  return (
    <Card className="portfolio-item my-4 shadow-sm rounded-none">
      <Card.Header className="!rounded-none !bg-purple-600 !bg-gradient-to-tr !from-blue-500 !to-purple-600 text-white">
        <h2 className="text-3xl">{project.name}</h2>

      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={12} lg={6}>
            <Carousel showThumbs={false} dynamicHeight={true}>
              {project.screenshots.map((src, index) => (
                <div key={index}>
                  <img src={src} alt={`Screenshot ${index + 1}`} className="img-fluid rounded"/>
                </div>
              ))}
            </Carousel>
          </Col>
          <Col md={12} lg={6}>
            <p className="text-lg py-4">{project.description}</p>
            <h4 className="text-cyan-700 text-xl">Highlights</h4>
            <hr/>
            <ListGroup variant="flush">
              {project.highlights.map((highlight, index) => (
                <ListGroup.Item key={index} className="py-0"> • {highlight}</ListGroup.Item>
              ))}
            </ListGroup>
            <h4 className="mt-4">Technologies Used</h4>
            <div className="d-flex flex-wrap">
              {project.technologies.map((tech, index) => (
                <div key={index} className="d-flex align-items-center mr-3 mb-2">
                  <img src={`https://skillicons.dev/icons?i=${tech.icon}`} alt={tech.name} className="icon"/>
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
