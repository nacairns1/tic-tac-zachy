import { useState, useCallback } from "react";

const LoginForm = (props) => {
	const [currForm, setCurrForm] = useState("Register");

	const swapForm = useCallback(() => {
		if (currForm === "Register") {
			setCurrForm("Log in");
		} else if (currForm === "Log in") {
			setCurrForm("Register");
		}
	});

	const handleSubmit = async (event ) => {
		event.preventDefault();

		const data = {
			email: event.target.email.value,
			username: event.target.username.value,
			password: event.target.password.value
		}
		console.log(data);
	}

	return (
		<div className={"bg-base-300 md:w-1/2  px-5 py-5 rounded-3xl shadow-md"}>
			<h2 className="text-xl text-primary-focus">{currForm}</h2>
			<form className="form-control" onSubmit={handleSubmit}>
				{currForm === "Register" && (
					<div>
						<label className="label">
							<span className="label-text">Email</span>
							<span className="label-text-alt text-2xs ">
								Email is not public for other users
							</span>
						</label>
						<input
							type="email"
							placeholder=""
							name="email"
							className="input input-bordered w-full"
						/>
					</div>
				)}

				<label className="label">
					<span className="label-text">Username</span>
				</label>
				<input
					type="text"
					name="username"
					placeholder=""
					
					className="input input-bordered w-full "
				/>
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					minLength={6}
					type="password"
					placeholder=""
					name="password"
					className="input input-bordered w-full"
				/>
				<div className="flex flex-col md:flex-row gap-5 justify-center items-center pt-2">
					<button className="btn btn-primary btn-md" type={"submit"}>
						Submit
					</button>
					<button className="btn btn-secondary btn-md" onClick={swapForm}>
						{currForm === "Register" ? "Log in" : "Register"}
					</button>
				</div>
			</form>
		</div>
	);
};

module.exports = { LoginForm };
