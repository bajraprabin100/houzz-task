import React from 'react';
import './cardHorizontal.scss';
import { Button, Card, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
export const CardHorizontal = (props: any) => (
  <Card className='card-horizontal'>
    <Card.Body>
      <Row>
        <Col lg='2' md='4' className='image-wrapper'>
          <div className='image-wrapper'>
            <OverlayTrigger
              key='top'
              placement='top'
              overlay={<Tooltip id={`tooltip-${top}`}>Ingredients: grain, hops, yeast, water</Tooltip>}>
              <Card.Img src={props.imageUrl} />
            </OverlayTrigger>
          </div>
        </Col>
        <Col lg='10' md='8'>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text className='sub-title'>{props.tagline}</Card.Text>
          <Card.Text className='content'>{props.description.substring(0, 150)}</Card.Text>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
