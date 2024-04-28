import { useState, useEffect } from 'react';

const Fetch = () => {
  const [rentals, setRentals] = useState([]);
  useEffect(() => {
    fetch('/src/assets/data/rentals.json')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRentals(data);
      });
  }, []);
  return (
   {rentals}
  );
};

export default Fetch;