import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartContext from "../context/CartContext";

function OrderSummary() {
	const { cart, Decrement, Increment, removeFromCart } =
		useContext(CartContext);
	const navigate = useNavigate();
	const [OriginalPrice, setOriginalPrice] = useState(0);
	const [Savings, setSavings] = useState(0);
	const [Delivery, setDelivery] = useState(40);

	const discount = 10;
	useEffect(() => {
		setSavings(Math.round(OriginalPrice * discount) / 100);
	}, [OriginalPrice]);
	useEffect(() => {
		if (OriginalPrice > 499 || OriginalPrice == 0) setDelivery(0);
		else setDelivery(40);
	}, [OriginalPrice]);

	useEffect(() => {
		setOriginalPrice(
			Math.round(
				cart.reduce((total, product) => {
					return total + product.price * product.quantity;
				}, 0) * 100
			) / 100
		);
	}, [cart]);

	const handleCheckout = () => {
		toast.success("Order Placed", {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			onClose: () => {
				console.log("Redirecting to login page...");
				navigate("/Home");
			},
		});
	};

	return (
		<div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
			<p className="text-xl font-semibold text-gray-900 dark:text-white">
				Order summary
			</p>

			<div className="space-y-4">
				<div className="space-y-2">
					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-500 dark:text-gray-400">
							Original price
						</dt>
						<dd className="text-base font-medium text-gray-900 dark:text-white">
							₹
							{OriginalPrice.toLocaleString("en-US", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</dd>
					</dl>

					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-500 dark:text-gray-400">
							Discount
						</dt>
						<dd className="text-base font-medium text-green-600">
							{discount} %
						</dd>
					</dl>
					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-500 dark:text-gray-400">
							Savings
						</dt>
						<dd className="text-base font-medium text-green-600">
							-₹ {Savings}
						</dd>
					</dl>

					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-500 dark:text-gray-400">
							Delivery Charge
						</dt>
						<dd className="text-base font-medium text-gray-900 dark:text-white">
							₹ {Delivery}
						</dd>
					</dl>

					<dl className="flex items-center justify-between gap-4">
						<dt className="text-base font-normal text-gray-500 dark:text-gray-400">
							Tax
						</dt>
						<dd className="text-base font-medium text-gray-900 dark:text-white">
							Included
						</dd>
					</dl>
				</div>

				<dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
					<dt className="text-base font-bold text-gray-900 dark:text-white">
						Total
					</dt>
					<dd className="text-base font-bold text-gray-900 dark:text-white">
						₹{" "}
						{(OriginalPrice - Savings + Delivery).toLocaleString("en-US", {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2,
						})}
					</dd>
				</dl>
			</div>

			<button
				onClick={handleCheckout}
				className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
			>
				Proceed to Checkout
			</button>

			<div className="flex items-center justify-center gap-2">
				<span className="text-sm font-normal text-gray-500 dark:text-gray-400">
					{" "}
					or{" "}
				</span>
				<Link
					to="/Home"
					title=""
					className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
				>
					Continue Shopping
					<svg
						className="h-5 w-5"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M19 12H5m14 0-4 4m4-4-4-4"
						/>
					</svg>
				</Link>
			</div>
		</div>
	);
}

export default OrderSummary;
