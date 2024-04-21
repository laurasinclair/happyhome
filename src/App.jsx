import { HomePage, NotFound, About } from '@pages'
import { NavBar, SideBar, Footer } from '@components'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.sass'

window.appName = 'Pretty Cool App'

function App() {
	const [isSidebarActive, setSidebarActive] = useState(false)

	const toggleSidebar = (event) => {
		event.preventDefault();
		setSidebarActive((prev) => !prev)
	}

	return (
		<>
			<div id="app">
				<NavBar logoUrl="./hamburger.png" logoWidth="30" logoHeight="30" toggleSidebar={toggleSidebar} />

				<SideBar isActive={isSidebarActive} />

				<div className="page">
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<About />} />
						<Route path="*" element={<NotFound />} />
					</Routes>

					<Footer repositoryLink="#" repositoryLinkDesc="Repository link" />
				</div>
			</div>
		</>
	)
}

export default App
