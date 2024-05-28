import { Dashboard, NotFound, About, RentalItem, Stats } from '@pages'
import { NavBar, SideBar, Footer } from '@components'
import RentalsContextProvider from '@components/RentalsContext'

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.sass'
import { getData } from '@helpers'

window.appName = 'HappyHome'

function App() {
	// sidebar stuff
	const [isSidebarActive, setSidebarActive] = useState(false)

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev)
	}

	return (
		<>
			<div id="app">
				<RentalsContextProvider>
					<NavBar toggleSidebar={toggleSidebar} />
					<SideBar isActive={isSidebarActive} />

					<div className="page">
						<div className="main">
							<Routes>
								<Route path="/" element={<Dashboard />} />
								<Route path="/about" element={<About />} />
								<Route path="/stats" element={<Stats />} />
								<Route path="/rentals/:rentalId" element={<RentalItem />} />
								<Route path="*" element={<NotFound />} />
							</Routes>
						</div>

						<Footer repositoryLink="https://github.com/laurasinclair/happyhome" repositoryLinkDesc="HappyHome | Repository link" />
					</div>
				</RentalsContextProvider>
			</div>
		</>
	)
}

export default App