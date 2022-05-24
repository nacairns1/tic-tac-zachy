import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const navigation = [
	{ name: "Home", href: "#", current: true },
	{ name: "Tic-Tac-Toe", href: "#", current: false },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
	return (
		<div className="navbar bg-slate-600">
			<div className="flex-1">
				<a className="btn btn-ghost normal-case text-xl">TTZ</a>
			</div>
			<div className="flex-none">
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle">
						<div className="w-10 rounded-full flex justify-center align-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</label>
					<div
						tabIndex="0"
						className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
					>
						<div className="card-body">
							<span className="font-bold text-lg">8 Items</span>
							<span className="text-info">Subtotal: $999</span>
							<div className="card-actions">
								<button className="btn btn-primary btn-block">View cart</button>
							</div>
						</div>
					</div>
				</div>
				<div className="dropdown dropdown-end">
					<label tabIndex="0" className="btn btn-ghost btn-circle">
						<div className="w-10 rounded-full flex justify-center align-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
								/>
							</svg>
						</div>
					</label>
					<ul
						tabIndex="0"
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<a className="justify-between">
								Profile
								<span className="badge">New</span>
							</a>
						</li>
						<li>
							<a>Settings</a>
						</li>
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

module.exports = { NavBar };
