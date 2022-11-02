import axios from "axios";

const client = axios.create({
  baseURL: "https://fakestoreapi.com/products",
});

export default client;
