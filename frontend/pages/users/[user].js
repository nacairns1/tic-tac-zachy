const Router = require("next/router");

const User = (props) => {
	const user = props.user;
	return (
		<div>
			<div>{user.username}</div>
			<div>
                Active Games: 
            </div>
            
		</div>
	);
};

User.getInitialProps = (ctx) => {
	const { user } = ctx.query;
	return { user };
};

module.exports = User;
