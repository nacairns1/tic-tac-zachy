import Image from "next/image";

const gamePreview = () => {
	return (
		<div className="card w-1/4 bg-base-100 shadow-xl">
			<div className="min-h-[10rem] relative">
					<Image src="/ttt_stock_photo.jpg" layout="fill" alt="preview"></Image>
			</div>
			<div className="card-body">
				<h4 className="card-title">Game!</h4>
				<p>X vs O</p>
			</div>
		</div>
	);
};

export default gamePreview;
