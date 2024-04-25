import { Hero } from '@components'
import { Link, useParams } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { Trash, StarFill, Pen } from 'react-bootstrap-icons'
import placeholder from '@img/placeholder_image.jpg'
import { Button, BackButton } from '@components'
import styles from '@components/RentalCard.module.sass'
import { useState, useEffect } from 'react'

export default function RentalItem() {
	
	return (
		<main className="main">
			 <Container fluid>
				<Row>
					<Col className="p-4">
						<BackButton />
					</Col>
				</Row>
				<Row>
					<Col>
						<Hero category="Rental item" title={name} size="s" />
					</Col>
				</Row>
			</Container>
		</main>
	)
}
