import { Dashboard, NotFound, About, RentalItem } from '@pages'
import { NavBar, SideBar, Footer } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.sass'
import rentalsJSON from '/src/assets/data/rentals.json'
import axios from 'axios'

window.appName = 'HappyHome'

function App() {
	// sidebar stuff
	const [isSidebarActive, setSidebarActive] = useState(false)

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev)
	}

	// fetching rentals 
	const [rentals, setRentals] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		axios
			.get('/src/assets/data/rentals.json')
			.then(function (resp) {
				console.log('resp.data from App.jsx', resp.data)
				setRentals([...resp.data?.results])
			})
			.then(function (data) {
				// setRentals([...data?.data?.results])
			})
			.catch(function (err) {
				console.log('oh no!', err)
			})
			.finally(function () {
				// rentals.unshift({'1': '1'}) // just a test
				setLoading(false)
			})
	}, [])

	return (
		<>
			<div id="app">
				<NavBar toggleSidebar={toggleSidebar} />

				<SideBar isActive={isSidebarActive} />

				<div className="page">
					<Routes>
						<Route path="/" element={<Dashboard rentals={rentals} loading={loading} />} />
						<Route path="/about" element={<About />} />
						<Route path="/rentals/:rentalId" element={<RentalItem loading={loading} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer repositoryLink="https://github.com/laurasinclair/happyhome" repositoryLinkDesc="HappyHome | Repository link" />
				</div>
			</div>
		</>
	)
}

export default App