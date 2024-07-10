import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

function UserProfile() {
	const { username } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		if (localStorage.getItem("login") === "false") {
			console.log(localStorage.getItem("login"));
			toast.error("Redirecting to Login Page", {
				position: "top-center",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				onClose: () => {
					navigate("/");
				},
			});
		}
	}, []); // Empty dependency array to ensure this effect runs only once after mount
	const handleLogout = () => {
		toast.success("Logged out successfully!", {
			position: "top-right",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			onClose: () => {
				localStorage.setItem("login", "false");
				navigate("/");
			},
		});
	};

	return localStorage.getItem("login") === "true" ? (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold my-4">Welcome, {username}!</h1>
			<button
				className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-400"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	) : (
		<div className="flex flex-col items-center">
			<h1 className="text-3xl font-bold my-4">
				Please Login to view your profile
			</h1>
		</div>
	);
}

export default UserProfile;
