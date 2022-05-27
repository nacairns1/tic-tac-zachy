import { useCallback, useEffect, useState } from "react";

import { LoginForm } from "../../components/LoginForm";

const Login = (props) => {


	return (
		<div className="py-10 flex w-full justify-around items-center">
			<LoginForm />
		</div>
	);
};

module.exports = Login;
