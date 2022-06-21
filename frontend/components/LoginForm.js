import { useState, useCallback } from "react";
import { useFormik } from "formik";
const axios = require("axios").default;
import Router from "next/router";

import {useAuthContext} from '../contexts/AuthContext';

const validate = (values) => {
	const errors = {};

	if (!values.username) {
		errors.username = "Required";
	} else if (values.username.length > 15) {
		errors.username = "Must be 15 characters or less";
	}

	if (values.password.length < 6 && values.password !== "") {
		errors.password = "Password must be at least 6 characters";
	} else if (values.password.length > 30) {
		errors.lastName = "Must be 30 characters or less";
	}
	return errors;
};

const LoginForm = (props) => {
	const [currForm, setCurrForm] = useState("Log in");
	const [loading, setLoading] = useState(false);
	const {authDispatch} = useAuthContext();

	const onRegisterFormSubmit = useCallback(async (data) => {
		const httpMessageConfig = {
			method: "post",
			url: "https://ttz-rest-pp2rerpupa-uc.a.run.app/users/register",
			data: {
				username: data.username,
				password: data.password,
				games: []
			},
		};
		try {
			const res = await axios(httpMessageConfig);
			let username = res.data.user;
			authDispatch({username: username, type: "LOGIN_SUCCESS"});
			Router.push(`/users/${username}`);
			return;
		} catch (e) {

			formik.isValid = false;
		}
	});
	
	const onloginFormSubmit = useCallback(async (data) => {
		const httpMessageConfig = {
			method: "post",
			url: "https://ttz-rest-pp2rerpupa-uc.a.run.app/users/login",
			data: {
				username: data.username,
				password: data.password,
			},
		};
		try {
			const res = await axios(httpMessageConfig);
			let username = res.data.user;
			authDispatch({username: username, type: "LOGIN_SUCCESS"});

			Router.push(`/users/${username}`);
			return;
		} catch (e) {
			formik.isValid = false;
		}
	});

	const formik = useFormik({
		initialValues: { username: "", password: "" },
		validate: validate,
		onSubmit:
			currForm === "Register" ? onRegisterFormSubmit : onloginFormSubmit,
	});

	const swapForm = useCallback(() => {
		if (currForm === "Register") {
			setCurrForm("Log in");
		} else if (currForm === "Log in") {
			setCurrForm("Register");
		}
	});

	return (
		<div className="w-full h-full flex flex-col md:flex-row items-center justify-around">
			<div className={"bg-base-300 w-3/5  px-5 py-5 rounded-3xl shadow-md"}>
				<h2 className="text-xl text-primary-focus font-bold">{currForm}</h2>
				<form className="form-control" onSubmit={formik.handleSubmit}>

					<label className="label">
						<span className="label-text">Username</span>
					</label>
					<input
						className={`w-4/5 input input-bordered ${formik.errors.username && 'input-error'}`}
						type="text"
						name="username"
						onChange={formik.handleChange}
						value={formik.values.username}
					/>
					{formik.errors.username ? (
						<div className="text-error-content italic">
							{formik.errors.username}
						</div>
					) : null}
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						className={`w-4/5 input input-bordered ${(currForm === "Register" && formik.errors.password) && 'input-error'}`} 
						type="password"
						name="password"
						onChange={formik.handleChange}
						value={formik.values.password}
					/>
					{(formik.errors.password  && currForm === "Register") ? (
						<div className="text-error-content italic">
							{formik.errors.password}
						</div>
					) : null}
					<div className="flex flex-col md:flex-row gap-5 justify-center items-center pt-2">
						<button className={`btn btn-primary ${formik.values.password && formik.values.username ? '' : 'btn-disabled'}`} type={"submit"} onClick={()=>{}}>
							{currForm}
						</button>
					</div>
				</form>
			</div>
			<div className="flex flex-row md:flex-col w-1/5 py-3 min-w-fit gap-3 items-center italic">
				{currForm === "Register"
					? "Already have an account?"
					: "Need to create an account?"}
				<button className="btn btn-secondary" onClick={swapForm}>
					{currForm === "Register" ? "Log in" : "Register"}
				</button>
			</div>
		</div>
	);
};


module.exports = { LoginForm };
