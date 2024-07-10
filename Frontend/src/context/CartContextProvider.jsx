import React, { useState } from "react";
import CartContext from "./CartContext";
import { toast } from "react-toastify";
function CartContextProvider({ children }) {
	const [cart, setCart] = useState([]);

	const addToCart = (newProduct) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find(
				(product) => product.id === newProduct.id
			);

			if (existingProduct) {
				return prevCart.map((product) =>
					product.id === newProduct.id
						? { ...product, quantity: product.quantity + 1 }
						: product
				);
			} else {
				toast.success("Added to Cart");
				return [...prevCart, { ...newProduct, quantity: 1 }];
			}
		});
	};

	const Decrement = (productToDecrement) => {
		setCart((prevCart) => {
			const existingProduct = prevCart.find(
				(product) => product.id === productToDecrement.id
			);
			if (existingProduct.quantity === 1) {
				return prevCart.filter(
					(product) => product.id !== productToDecrement.id
				);
			} else {
				return prevCart.map((product) =>
					product.id === productToDecrement.id
						? { ...product, quantity: product.quantity - 1 }
						: product
				);
			}
		});
	};

	const Increment = (productToIncrement) => {
		setCart((prevCart) => {
			return prevCart.map((product) =>
				product.id === productToIncrement.id
					? { ...product, quantity: product.quantity + 1 }
					: product
			);
		});
	};

	const removeFromCart = (productToRemove) => {
		setCart((prevCart) =>
			prevCart.filter((product) => product.id !== productToRemove.id)
		);
	};

	const clearCart = () => {
		setCart([]);
	};

	return (
		<>
			<CartContext.Provider
				value={{ cart, addToCart, Decrement, Increment, removeFromCart }}
			>
				
				{children}
			</CartContext.Provider>
		</>
	);
}

export default CartContextProvider;

// import React, { useState } from "react";
// import CartContext from "./CartContext";

// function CartContextProvider({ children }) {
// 	const [cart, setCart] = useState([]);

// 	const addToCart = (newProduct) => {
// 		const ids = cart.map((product) => product.id);
// 		if (ids.includes(newProduct.id)) {
// 			cart.filter((product) => {
// 				return product.id === newProduct.id;
// 			})[0].quantity += 1;
// 			setCart[cart];
// 		} else {
// 			newProduct.quantity = 1;
// 			setCart((prevCart) => [...prevCart, newProduct]);
// 		}
// 		console.log(cart);
// 	};
// 	const Decrement = (newProduct) => {
// 		const ids = cart.map((product) => product.id);
// 		if ( ids.includes( newProduct.id ) )
// 		{

// 			if (cart.filter((product) => {return product.id === newProduct.id} )[ 0 ].quantity === 1 )
// 			{
// 				removeFromCart(newProduct);
// 			}
// 			else
// 			{
// 				cart.filter((product) => {
// 					return product.id === newProduct.id;
// 				})[0].quantity -= 1;
// 				setCart[cart];
// 			}
// 		}
// 		console.log(cart);
// 	};
// 	const Increment = (newProduct) => {
// 		const ids = cart.map((product) => product.id);
// 		if (ids.includes(newProduct.id)) {
// 			cart.filter((product) => {
// 				return product.id === newProduct.id;
// 			})[0].quantity += 1;
// 			setCart[cart];
// 		}
// 		console.log(cart);
// 	};

// 	const removeFromCart = (product) => {
// 		setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
// 	};

// 	const clearCart = () => {
// 		setCart([]);
// 	};

// 	return (
// 		<CartContext.Provider
// 			value={{ cart, addToCart, Decrement, Increment, removeFromCart }}
// 		>
// 			{children}
// 		</CartContext.Provider>
// 	);
// }

// export default CartContextProvider;