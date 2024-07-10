import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import Topdeals from "../Components/Topdeals";

export function Home2() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const getProductData = async () => {
			try {
				const response = await axios.get("https://fakestoreapi.com/products");
				console.log(response.data);
				setProducts(response.data);
				const uniqueCategories = [
					...new Set(response.data.map((object) => object.category)),
				];
				console.log(uniqueCategories);
				setCategories(uniqueCategories);
			} catch (error) {
				console.error("Error fetching data: ", error);
				toast.error("Failed to fetch product data");
			}
		};

		getProductData();
	}, []);

	return (
		<>
			<Navbar />
				{products.length > 0 &&
					categories.map((category, index) => {
						return (
							<Topdeals
								key={index}
								product_list={products.filter(
									(product) => product.category === category
								)}
								category={category}
							/>
						);
					})}
		</>
	);
}

export default Home2;
