import axios from "axios";

class RentalsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_MONGODB_BASEURL || "http://localhost:5005",
    });
  }
  getAllRentals = () => {
    return this.api.get(`/rentals/${id}`);
  };

  post = (requestBody) => {
    return this.api.post("/rentals", requestBody);
  };

  delete = (id) => {
    console.log("deleted rental");
    return this.api.delete(`/rentals/${id}`);
  };
}

const rentalsService = new RentalsService();

export default rentalsService;
