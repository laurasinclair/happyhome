import { HomePage, NotFound, About, RentalItem } from '@pages'
import { NavBar, SideBar, Footer } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.sass'
import rentalsData from '@/assets/data/rentals.json'

window.appName = 'HappyHome'

function App() {
	const [isSidebarActive, setSidebarActive] = useState(false)

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev)
	}

	const [rentals, setUptoDateRentals] = useState(rentalsData)

	const gimmethedata = (newRental) => {
		console.log('the data', newRental)

		// setUptoDateRentals([newRental, ...rentals])
		// pretty sure that from here I can pass this new rental to :rentalId tooo
		// I think that the id generated for new items is the problem, it doesn't lead anywhere
	}

	return (
		<>
			<div id="app">
				<NavBar toggleSidebar={toggleSidebar} />

				<SideBar isActive={isSidebarActive} />

				<div className="page">
					<Routes>
						<Route path="/" element={<HomePage rentalsData={rentalsData} gimmethedata={gimmethedata} />} />
						<Route path="/about" element={<About />} />
						<Route path="/rentals/:rentalId" element={<RentalItem rentals={rentals}  />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer repositoryLink="https://github.com/laurasinclair/project-2-react-app" repositoryLinkDesc="HappyHome | Repository link" />
				</div>
			</div>
		</>
	)
}

export default App
