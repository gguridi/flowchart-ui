import store from "store2";
import * as ChartActions from "../actions/charts";

const charts = store.namespace("charts");
const defaultState = { selected: "", charts: charts.getAll() };

const newStateWithChart = (state, chart) => {
    return Object.assign({}, state, {
        charts: { ...state.charts, [chart.id]: chart },
    });
};

const chartsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ChartActions.CREATE_CHART:
            return newStateWithChart(state, action.chart);
        case ChartActions.UPDATE_CHART:
            return newStateWithChart(state, action.chart);
        case ChartActions.SELECT_CHART:
            return Object.assign({}, state, { selected: action.id });
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
