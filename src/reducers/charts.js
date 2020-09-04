import store from "store2";
import * as ChartActions from "../actions/charts";

const charts = store.namespace("charts");
const defaultState = { charts: charts.getAll() };

const chartsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ChartActions.CREATE_CHART:
        case ChartActions.UPDATE_CHART:
            return Object.assign({}, state, {
                charts: { ...state.charts, [action.chart.id]: action.chart },
            });
        case ChartActions.DELETE_CHART:
            let loaded = { ...state.charts };
            delete loaded[action.id];
            return Object.assign({}, state, {
                charts: loaded,
            });
        default:
            return state;
    }
};

export default chartsReducer;
