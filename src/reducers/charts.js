import store from "store2";
import raw from "raw.macro";
import * as ChartActions from "../actions/charts";

const randomExample = () => {
    const examples = [
        raw("../examples/simple-flow.txt"),
        raw("../examples/color-coding.txt"),
    ];
    return examples[Math.floor(Math.random() * examples.length)];
};

const getCharts = () => {
    const defaultChart = {
        id: 0,
        title: "Example Chart",
        code: randomExample(),
    };
    const loaded = charts.getAll();
    return Object.keys(loaded).length > 0 ? loaded : { 0: defaultChart };
};

const charts = store.namespace("charts");
const defaultState = { selected: "", charts: getCharts() };

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
