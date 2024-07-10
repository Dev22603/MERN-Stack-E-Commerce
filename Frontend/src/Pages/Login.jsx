import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { loginSchema } from "../schemas/loginSchema";
const initialValues = {
	email: "",
	password: "",
};

// unit@TY23

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/axiosInstance";

function Login() {
	const navigate = useNavigate();
	const [loginStatus, setLoginStatus] = useState(false);

	const getLoginStatus = async () => {
		try {
			const res = await axiosInstance.post(
				"api/users/check-login-status",
				{},
				{ withCredentials: true }
			);
			console.log(res);
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
				if (loginStatus) {
					navigate("/Home");
				}
			})
			.catch((errors) => {
				console.log(errors);
			});
	}, [loginStatus]);

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: initialValues,
			validationSchema: loginSchema,
			onSubmit: async (values) => {
				try {
					const res = await axiosInstance.post(
						"http://localhost:3000/api/users/Login",
						{
							email: values.email,
							password: values.password,
						}
					);

					toast.success("Logging in!!", {
						position: "top-right",
						autoClose: 1000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						onClose: () => {
							navigate("/Home");
						},
					});
				} catch (error) {
					console.log(error, "-----");
					toast.error(
						`${error.message}The e-mail address and/or password you specified are not correct.`,
						{
							position: "top-center",
							autoClose: 3000,
							hideProgressBar: false,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						}
					);
				}
			},
		});

	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};
	return (
		<div>
			<Navbar></Navbar>

			<section className="bg-white dark:bg-gray-900">
				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
					<Link
						to="#"
						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
					>
						<img
							className="w-[300px] mr-2"
							src="src\assets\logo.png"
							alt="logo"
						/>
					</Link>
					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Sign in to your account
							</h1>
							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
								<div>
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Your Email
									</label>
									<div className="flex-col justify-between items-center">
										<input
											type="email"
											name="email"
											id="email"
											autoComplete="on"
											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											placeholder="name@company.com"
											required=""
											value={values.email}
											onChange={handleChange}
											onBlur={handleBlur}
										/>
										
										<p className="text-red-600 font text-sm">
											{touched.email && errors.email ? errors.email : "\u00A0"}
										</p>
									</div>
								</div>
								<div>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<div className="flex-col justify-between items-center">
										<div className="flex relative">
											<input
												type={showPassword ? "text" : "password"}
												name="password"
												id="password"
												placeholder="••••••••"
												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required=""
												value={values.password}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											<button
												type="button"
												className="absolute inset-y-0 right-0 px-3 flex items-center"
												onClick={togglePasswordVisibility}
											>
												{showPassword ? (
													<img
														src="src\assets\show-password-3.svg"
														className="h-7"
													/>
												) : (
													<img
														src="src\assets\hide-password-512.png"
														className="h-7"
													/>
												)}
											</button>
										</div>
										
										<p className="text-red-600 font text-sm">
											{touched.password && errors.password
												? errors.password
												: "\u00A0"}
										</p>
									</div>
								</div>
								<div className="flex items-center justify-between">
									<div className="flex items-start">
										<div className="flex items-center h-5">
											<input
												id="remember"
												aria-describedby="remember"
												type="checkbox"
												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
												required=""
											/>
										</div>
										<div className="ml-3 text-sm">
											<label
												htmlFor="remember"
												className="text-gray-500 dark:text-gray-300"
											>
												Remember me
											</label>
										</div>
									</div>
									<Link
										to="/ForgotPassword"
										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Forgot password?
									</Link>
								</div>
								<button
									type="submit"
									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
								>
									Sign in
								</button>
								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
									Don’t have an account yet?{" "}
									<Link
										to="/Signup"
										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
									>
										Sign up
									</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default Login;

//
//
//
//
//
//
// import React from "react";
// import { Link } from "react-router-dom";
// import { Formik, useFormik } from "formik";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import CryptoJS from "crypto-js";
// import Navbar from "../Components/Navbar";
// import * as Yup from "yup";
// import { loginSchema } from "../schemas/loginSchema";
// const initialValues = {
// 	email: "",
// 	password: "",
// };

// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Function to encrypt data
// const encryptData = (data) => {
// 	console.log(
// 		CryptoJS.AES.encrypt(data, "secret-key@63274JHGHGJHGsdfjdsh").toString()
// 	);
// 	return CryptoJS.AES.encrypt(
// 		data,
// 		"secret-key@63274JHGHGJHGsdfjdsh"
// 	).toString();
// };

// // Function to decrypt data
// const decryptData = (data) => {
// 	return CryptoJS.AES.decrypt(data, "secret-key@63274JHGHGJHGsdfjdsh").toString(
// 		CryptoJS.enc.Utf8
// 	);
// };

// function Login() {
// 	const navigate = useNavigate();

// 	useEffect(() => {
// 		if (
// 			localStorage.getItem("login") === "true" &&
// 			localStorage.getItem("login") &&
// 			localStorage.getItem("login_user")
// 		) {
// 			navigate('/Home');
// 			// navigate(`/user/${localStorage.getItem("login_user")}`);
// 		}
// 	}, []);
// 	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
// 		useFormik({
// 			initialValues: initialValues,
// 			validationSchema: loginSchema,
// 			onSubmit: async (values) => {
// 				const storedUser = JSON.parse(localStorage.getItem(values.email));

// 				if (
// 					storedUser &&
// 					decryptData(storedUser.password) === values.password
// 				) {
// 					const username = values.email.split("@")[0];

// 					localStorage.setItem("login_user", username);
// 					localStorage.setItem( "login", "true" );
// 					toast.success("Logging in!", {
// 						position: "top-right",
// 						autoClose: 3000,
// 						hideProgressBar: false,
// 						closeOnClick: true,
// 						pauseOnHover: true,
// 						draggable: true,
// 						progress: undefined,
// 						onClose: () => {
// 							console.log("Redirecting to login page...");
// 							navigate("/Home");
// 						},
// 					});
// 					// navigate('/Home');
// 					// navigate(`/user/${username}`);
// 				} else {
// 					alert(
// 						"The e-mail address and/or password you specified are not correct."
// 					);
// 				}
// 			},
// 		});

// 	const [showPassword, setShowPassword] = useState(false);

// 	const togglePasswordVisibility = () => {
// 		setShowPassword(!showPassword);
// 		console.log("🚀 ~ togglePasswordVisibility ~ showPassword:", showPassword);
// 	};
// 	return (
// 		<div>
// 			<Navbar></Navbar>

// 			<section className="bg-white dark:bg-gray-900">
// 				<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
// 					<Link
// 						to="#"
// 						className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
// 					>
// 						<img
// 							className="w-[300px] mr-2"
// 							src="src\assets\logo.png"
// 							alt="logo"
// 						/>
// 					</Link>
// 					<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
// 						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
// 							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
// 								Sign in to your account
// 							</h1>
// 							<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
// 								<div>
// 									<label
// 										htmlFor="email"
// 										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// 									>
// 										Your Email
// 									</label>
// 									<div className="flex-col justify-between items-center">
// 										<input
// 											type="email"
// 											name="email"
// 											id="email"
// 											autoComplete="on"
// 											className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// 											placeholder="name@company.com"
// 											required=""
// 											value={values.email}
// 											onChange={handleChange}
// 											onBlur={handleBlur}
// 										/>
// 										{/* {touched.email && errors.email && (
// 											<p className="text-red-600 font text-sm">
// 												{errors.email}
// 											</p>
// 										)} */}
// 										<p className="text-red-600 font text-sm">
// 											{touched.email && errors.email ? errors.email : "\u00A0"}
// 										</p>
// 									</div>
// 								</div>
// 								<div>
// 									<label
// 										htmlFor="password"
// 										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// 									>
// 										Password
// 									</label>
// 									<div className="flex-col justify-between items-center">
// 										<div className="flex relative">
// 											<input
// 												type={showPassword ? "text" : "password"}
// 												name="password"
// 												id="password"
// 												placeholder="••••••••"
// 												className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
// 												required=""
// 												value={values.password}
// 												onChange={handleChange}
// 												onBlur={handleBlur}
// 											/>
// 											<button
// 												type="button"
// 												className="absolute inset-y-0 right-0 px-3 flex items-center"
// 												onClick={togglePasswordVisibility}
// 											>
// 												{showPassword ? (
// 													<img
// 														src="src\assets\show-password-3.svg"
// 														className="h-7"
// 													/>
// 												) : (
// 													<img
// 														src="src\assets\hide-password-512.png"
// 														className="h-7"
// 													/>
// 												)}
// 											</button>
// 										</div>
// 										{/* {touched.password && errors.password && (
// 											<p className="text-red-600 font text-sm">
// 												{errors.password}
// 											</p>
// 										)} */}
// 										<p className="text-red-600 font text-sm">
// 											{touched.password && errors.password
// 												? errors.password
// 												: "\u00A0"}
// 										</p>
// 									</div>
// 								</div>
// 								<div className="flex items-center justify-between">
// 									<div className="flex items-start">
// 										<div className="flex items-center h-5">
// 											<input
// 												id="remember"
// 												aria-describedby="remember"
// 												type="checkbox"
// 												className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
// 												required=""
// 											/>
// 										</div>
// 										<div className="ml-3 text-sm">
// 											<label
// 												htmlFor="remember"
// 												className="text-gray-500 dark:text-gray-300"
// 											>
// 												Remember me
// 											</label>
// 										</div>
// 									</div>
// 									<Link
// 										to="/ForgotPassword"
// 										className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
// 									>
// 										Forgot password?
// 									</Link>
// 								</div>
// 								<button
// 									type="submit"
// 									className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
// 								>
// 									Sign in
// 								</button>
// 								<p className="text-sm font-light text-gray-500 dark:text-gray-400">
// 									Don’t have an account yet?{" "}
// 									<Link
// 										to="/Signup"
// 										className="font-medium text-primary-600 hover:underline dark:text-primary-500"
// 									>
// 										Sign up
// 									</Link>
// 								</p>
// 							</form>
// 						</div>
// 					</div>
// 				</div>
// 			</section>
// 		</div>
// 	);
// }

// export default Login;
