import {PianoActions}                from "../actions/PianoActions";
import React, {Component, PropTypes} from "react";

class BtnGroupCtrl extends Component {
    constructor(props) {
        super(props);

        this.updateVal = this.updateVal.bind(this);
    }
    render() {
        const {displayName, id, opts} = this.props;

        return (
            <section className="ctrls__group--btn">
                <h3 className="ctrls__group__title">{displayName}</h3>
                <ul className="ctrls__group__list--btn">
                    { this.renderOpts(opts, id) }
                </ul>
            </section>
        );
    }
    renderOpts(opts, id) {
        return opts.map((opt) => {
            const isChecked = opt.val === this.props.val;
            const cssMod = isChecked ? "--checked" : "";

            return (
                <li className="ctrl--btn" key={opt.val}>
                    <label className={"ctrl__label--btn" + cssMod} htmlFor={opt.val}>
                        {opt.displayName}
                    </label>
                    <input 
                        checked={isChecked}
                        className="ctrl__btn" 
                        id={opt.val}
                        name={id + "Types"}
                        onChange={this.updateVal}
                        type="radio"
                        value={opt.val} />
                </li>
            );
        });
    }      
    updateVal(e) {
        PianoActions.updateBtnGroup(this.props.id, e.target.value);
    }
}

BtnGroupCtrl.propTypes = {
    displayName: PropTypes.string,
    id: PropTypes.string,
    opts: PropTypes.array,
    val: PropTypes.string
};

BtnGroupCtrl.defaultProps = {
    displayName: "",
    id: "",
    opts: [],
    val: ""
};

export default BtnGroupCtrl;