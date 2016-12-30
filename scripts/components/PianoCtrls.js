import BtnGroupCtrl 				   from "./BtnGroupCtrl";
import {DisplayCtrl}    			   from "./DisplayCtrl";
import EnvCtrl 				   		   from "./EnvCtrl";
import {noiseTypes, oscTypes, tunings} from "../btn-groups";
import React, {Component, PropTypes}   from "react";
import SliderCtrl  					   from "./SliderCtrl";

class PianoCtrls extends Component {
    constructor(props) {
        super(props);
    }
	render() {
		const { freq, pitchClass, synthSettings } = this.props;
		const {
			bal, detune, env, gain, noise, osc, tuning
		} = synthSettings;

		const onMod = pitchClass ? "--on" : "";

		return (
			<section className="ctrls">
				<div className="ctrls__col">
					<BtnGroupCtrl
						displayName={osc.displayName}
						id={osc.id}
						opts={oscTypes}
						val={osc.val} />					
					<BtnGroupCtrl
						displayName={noise.displayName}
						id={noise.id}
						opts={noiseTypes}
						val={noise.val} />
					<BtnGroupCtrl
						displayName={tuning.displayName}
						id={tuning.id}
						opts={tunings}
						val={tuning.val} />
				</div>
				<div className="ctrls__col--display">
					<DisplayCtrl
						freq={freq}
						onMod={onMod}
						pitchClass={pitchClass} />
				</div>	
				<div className="ctrls__col">
					<ul className="ctrls__group--slider">
						<SliderCtrl
							displayName={bal.displayName}
							id={bal.id}
							max={bal.max}
							min={bal.min}
							step={bal.step}
							val={bal.val} />
						<SliderCtrl
							displayName={detune.displayName}
							id={detune.id}
							max={detune.max}
							min={detune.min}
							step={detune.step}
							val={detune.val} />
						<SliderCtrl
							displayName={gain.displayName}
							id={gain.id}
							max={gain.max}
							min={gain.min}
							step={gain.step}
							val={gain.val} />							
					</ul>				
				</div>
				<div className="ctrls__col">				
					<EnvCtrl 
						env={env} />					
				</div>			
			</section>
		);
	}
}

PianoCtrls.propTypes = {
	freq: PropTypes.number,
	pitchClass: PropTypes.string,
	synthSettings: PropTypes.object
};

PianoCtrls.defaultProps = {
	freq: 0,
	pitchClass: "",
	synthSettings: {}
};

export default PianoCtrls;