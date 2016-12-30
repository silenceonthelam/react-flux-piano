import {PianoActions}                from "../actions/PianoActions";
import React, {Component, PropTypes} from "react";

class SliderCtrl extends Component {
    constructor(props) {
        super(props);
        this.updateVal = this.updateVal.bind(this);
    }
    render() {
        const {
            displayName, 
            id,
            max,
            min,
            step,
            val
        } = this.props;
        const classMod = "";

        return (
            <li className="ctrl--slider" htmlFor={id}>
                <label className={"ctrl__label--slider"+ classMod}>
                    {displayName}
                </label>
                <input 
                    className={"ctrl__slider" + classMod}
                    id={id}
                    max={max}
                    min={min}
                    onChange={this.updateVal}
                    step={step}
                    type="range"
                    value={val} />
            </li>
        );
    }
    updateVal(e) {
        PianoActions.updateSlider(this.props.id, e.target.value);
    }
}

SliderCtrl.propTypes = {
    displayName: PropTypes.string,
    id: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    val: PropTypes.number
};

SliderCtrl.defaultProps = {
    displayName: "",
    id: "",
    max: 1,
    min: 0,
    step: .1,  
    val: 0
};

export default SliderCtrl;