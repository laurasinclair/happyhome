import { Dashboard, NotFound, About, RentalItem } from '@pages'
import { NavBar, SideBar, Footer } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.sass'
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
	const [err, setError] = useState('oops')

	useEffect(() => {
		axios
			.get('/src/assets/data/rentals.json')
			.then((resp) => setRentals([...resp.data?.results]))
			.catch((error) => setError(error))
			.finally(() => {
				setLoading(false)
			})
	}, [loading])
	


	// the source of everything
	const getRentals = () => {
		if (!loading) {
			return rentals
		}
	}

	if (loading) return <div>loading...</div>

	return (
		<>
			<div id="app">
				<NavBar toggleSidebar={toggleSidebar} />
				<SideBar isActive={isSidebarActive} />

				<div className="page">
					<Routes>
						<Route path="/" element={<Dashboard getRentals={getRentals} loading={loading} />} />
						<Route path="/about" element={<About />} />
						<Route path="/rentals/:rentalId" element={<RentalItem getRentals={getRentals} loading={loading} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer repositoryLink="https://github.com/laurasinclair/happyhome" repositoryLinkDesc="HappyHome | Repository link" />
				</div>
			</div>
		</>
	)
}

export default App