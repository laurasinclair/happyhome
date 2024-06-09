import {
	Dashboard,
	RentalsList,
	Rental,
	CreateRental,
	About,
	NotFound,
} from '@pages';
import { SideBar, Footer } from '@components';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

window.appName = 'HappyHome';

function App() {
	// sidebar stuff
	const [isSidebarActive, setSidebarActive] = useState(true);

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev);
	};

	return (
		<>
			<div id='app'>
				<SideBar
					isActive={isSidebarActive}
					toggleSidebar={toggleSidebar}
				/>

				<div className='page'>
					<div className='main'>
						<Routes>
							<Route
								path='/'
								element={<Dashboard />}
							/>
							<Route
								path='/rentals'
								element={<RentalsList />}
							/>
							<Route
								path='/add-rental'
								element={<CreateRental />}
							/>
							<Route
								path='/about'
								element={<About />}
							/>
							<Route
								path='/rentals/:rentalId'
								element={<Rental />}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
						</Routes>
					</div>

					<Footer
						repositoryLink='https://github.com/laurasinclair/happyhome'
						repositoryLinkDesc='HappyHome | Repository link'
					/>
				</div>
			</div>
		</>
	);
}

export default App;
