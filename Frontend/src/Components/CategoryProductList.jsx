import axios from "axios";
import React from "react";
import CategoryPageProductCard from "./CategoryPageProductCard";

function capitalizeEachWord(str) {
	let words = str.split(" ");

	let capitalizedWords = words.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	return capitalizedWords.join(" ");
}

// function CategoryProductList ( { product_list } )
// {
// 	return (
// 		<div className=" flex justify-start border p-10 m-10 rounded-md ">
// 			<h1 className="text-3xl font-bold mb-5">Top Deals</h1>
// 				{product_list.map((item, index) => (
// 					<Card1 key={index} item={item} />
// 				))}
// 		</div>
// 	);
// }



function CategoryProductList({ product_list,category}) {
	return (
		<div className="border p-10 m-10 rounded-md">
			<h1 className="text-3xl font-bold mb-5">{ category}</h1>
			<div className="flex justify-between flex-wrap ">
				{product_list.map((item, index) => (
					<CategoryPageProductCard key={index} item={item} />
				))}
			</div>
		</div>
	);
}

export default CategoryProductList;
