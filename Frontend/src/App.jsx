import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
// import Home2 from "./Pages/Home2";
import ForgotPassword from "./Pages/ForgotPassword";
import Cart from "./Pages/Cart";
import UserProfile from "./Pages/UserProfile"; 
import CartContextProvider from "./context/CartContextProvider";


import CategoryProducts from "./Pages/CategoryProducts";
import { ToastContainer } from "react-toastify";




function App() {
	if (localStorage.getItem("login") === null) {
		localStorage.setItem("login", "false");
	}
	return (
		<>
		<ToastContainer>
		</ToastContainer>

		<CartContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/Home" element={<Home />} />
					{/* <Route path="/Home2" element={<Home2 />} /> */}
					<Route path="/Cart" element={<Cart />} />
					<Route path="/" element={<Login />} />
					<Route path="/Signup" element={<Signup />} />
					<Route path="/Cart" element={<Cart />} />
					<Route path="/ForgotPassword" element={<ForgotPassword />} />
					<Route path="/user/:username" element={<UserProfile />} />

					<Route path="/categories/:category" element={<CategoryProducts />} />
				</Routes>
			</BrowserRouter>
		</CartContextProvider>
		</>
	);
}

export default App;
