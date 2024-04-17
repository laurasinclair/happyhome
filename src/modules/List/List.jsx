import { Container, Row, Col, Card } from 'react-bootstrap'
import React, { Component, useEffect, useState, } from 'react'
import axios from 'axios'
import './List.sass'
import rentals from "./rentals.json";
import placeholder from "/src/assets/img/placeholder_image.jpg";

class LocalFileRead extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
    function truncate(str) {
        return str.length > 10 ? str.substring(0, 100) + " (...)" : str;
    }
      return (
        <Container fluid>
            <Row>
                {rentals.results.map((rental, i) => (
                    <Col lg='6' xl='4' key={i} className="d-flex align-items-stretch">
                        <div className="list_card">
                            <div className="list_card_thumbnail">
                                <img src={placeholder} alt={rental.id} />
                            </div>
                            <div className="list_card_body">
                                <h3>
                                    {rental.name}
                                </h3>
                                <p>
                                    <strong>ID:</strong> {rental.id}
                                </p>
                                <p>
                                    <strong>Country:</strong> {rental.country}
                                </p>
                                <p>
                                    <strong>City:</strong> {rental.city}
                                </p>
                                <p>
                                    {truncate(rental.description)}
                                </p>
                            </div>
                        </div>
                    </Col>
                ))}
            </Row>
        </Container>
      );
    }
  }
  
  export default LocalFileRead;