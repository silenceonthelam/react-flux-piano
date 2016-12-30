import React from "react";

export const DisplayCtrl = ({freq, onMod, pitchClass}) => (
	<section className={"ctrl--display" + onMod}>
		<span className="ctrl__label--pitch-class">
			{pitchClass || "_"} 
		</span>
		<span className="ctrl__label--freq">
			{parseInt(freq, 10) || "_"}
		</span>
	</section>
);