import { Dashboard, NotFound, About, RentalItem, Stats } from '@pages'
import { SideBar, Footer } from '@components/layout'
import { RentalsContextProvider } from '@context'

import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.sass'

window.appName = 'HappyHome'

function App() {
	// sidebar stuff
	const [isSidebarActive, setSidebarActive] = useState(true)

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev)
	}

	return (
		<>
			<div id="app">
				<RentalsContextProvider>
					<SideBar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />

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