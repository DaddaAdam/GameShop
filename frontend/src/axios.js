import axios from "axios";

const instance = axios.create({
  baseURL: "http://68.183.35.226",
});

export default instance;
