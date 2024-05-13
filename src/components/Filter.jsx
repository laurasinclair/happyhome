import { useRentalsContext } from '@components/RentalsContext'

export default function Filter() {
	const { rentals, setRentals } = useRentalsContext()
	return (
		<>
			{rentals.map((rental, id) => {
				return (
					<button className="btn-dark text-white p-1 px-2 mx-5 btn fw-bold" onClick={() => filterItem(rental)} key={id}>
						{rental}
					</button>
				)
			})}
			<button className="btn-dark text-white p-1 px-3 mx-5 fw-bold btn" onClick={() => setItem(rentals)}>
				All
			</button>
		</>
	)
}