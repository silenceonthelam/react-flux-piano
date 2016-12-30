import {PianoActions}                from "../actions/PianoActions";
import React, {Component, PropTypes} from "react";

const envVals = [{
    displayName: "A",
    id: "a",
    val: 0.1
}, {
    displayName: "D",
    id: "d",
    val: 0.5
}, {
    displayName: "S",
    id: "s",
    val: 0.3
}, {
    displayName: "R",
    id: "r",
    val: 0.1
}];

class EnvCtrl extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <section className="ctrls__group--env">
                <h3 className="ctrls__group__title--env">Envelope</h3>
                <ul className="ctrls__group__list--env">
                    {this.renderSliders(envVals, this.props.env)}
                </ul>
            </section>
        );
    }
    renderSliders(envVals, env) {
        return envVals.map((envVal) => {
            return (
                <li className="ctrl--env" key={envVal.id}>
                    <label className="ctrl__label--env" htmlFor={envVal.id}>
                            {envVal.displayName}
                    </label>
                    <input 
                        className="ctrl__slider--env" 
                        id={envVal.id}
                        max={1}
                        min={0}
                        onChange={this.updateVal}
                        orient="vertical"
                        step={.05}
                        type="range"
                        value={env[envVal.id]} />
                </li>
            );
        });
    }    
    updateVal(e) {
        PianoActions.updateEnv(e.target.id, e.target.value);
    }
}

EnvCtrl.propTypes = {
    env: PropTypes.object
};

EnvCtrl.defaultProps = {
    env: {}
};

export default EnvCtrl;