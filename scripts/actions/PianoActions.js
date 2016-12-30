import AppDispatcher  from "../AppDispatcher";
import PianoConstants from "../PianoConstants";

export const PianoActions = {
	recalcNumKeys: (winWidth) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_RECALC_NUM_KEYS,
			winWidth: winWidth
		});
	},
	playNote: (note) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_PLAY_NOTE,
			note: note
		});
	},
	stopNote: (note) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_STOP_NOTE,
			note: note
		});
	},
	updateBtnGroup: (id, val) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_UPDATE_BTN_GROUP,
			btnGroupId: id,
			btnGroupVal: val
		});
	},
	updateEnv: (envId, envVal) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_UPDATE_ENV,
			envId: envId,
			envVal: envVal
		});
	},	
	updateSlider: (sliderId, sliderVal) => {
		AppDispatcher.dispatch({
			actionType: PianoConstants.PIANO_UPDATE_SLIDER,
			sliderId: sliderId,
			sliderVal: sliderVal
		});
	}
};