import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";

//any packages puts in main
//slick react package
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

createRoot(document.getElementById("root")).render(<App />);
