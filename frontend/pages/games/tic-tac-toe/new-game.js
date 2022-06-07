const Router = require("next/router");
import axios from "axios";
import { useEffect, useState } from "react";
import {GameBuilderForm} from '../../../components/GameBuilderForm';

const NewGame = (props) => {
	const [user, setUser] = useState();
	const [games, setGames] = useState();


	return (
		<div>
            <GameBuilderForm />
		</div>
	);
};

export default NewGame;