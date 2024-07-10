import axios from "axios";
import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/Navbar";
import Topdeals from "../Components/Topdeals";
import axiosInstance from "../api/axiosInstance";

export function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getProductData = async () => {
			try {
				const response = await axios.get("https://fakestoreapi.com/products");
				setProducts(response.data);
				const uniqueCategories = [
					...new Set(response.data.map((object) => object.category)),
				];
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error fetching data: ", error);
				toast.error("Failed to fetch product data");
			}
		};

		getProductData();
	}, []);

	const [loginStatus, setLoginStatus] = useState(true);

	const getLoginStatus = async () => {
		try {
			const res = await axiosInstance.post(
				"api/users/check-login-status",
				{},
				{ withCredentials: true }
			);
			// console.log(res);
			// console.log(res.data.statusCode === 200);
			return res.data.statusCode === 200;
		} catch (error) {
			return false;
		}
	};
	const fetchLoginStatus = async () => {
		const status = await getLoginStatus();
		setLoginStatus(status);
	};

	useEffect(() => {
		fetchLoginStatus()
			.then(() => {
				if (!loginStatus) {
					navigate("/");
				}
			})
			.catch((errors) => {
				// console.log(errors);
			});
	});


	return (
		<>
			<Navbar />
			{products.length > 0 && (
				<Topdeals
					product_list={[products[0], products[4], products[9], products[15]]}
				/>
			)}
		</>
	);
}

export default Home;
