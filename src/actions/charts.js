import store from "store2";

export const charts = store.namespace("charts");
export const SELECT_CHART = "SELECT_CHART";
export const CREATE_CHART = "CREATE_CHART";
export const UPDATE_CHART = "UPDATE_CHART";
export const DELETE_CHART = "DELETE_CHART";


export const actionSelect = (id) => {
    return { type: SELECT_CHART, id };
};

export const selectChart = (id) => {
    return (dispatch) => {
        return dispatch(actionSelect(id));
    };
};

export const actionCreate = (chart) => {
    return { type: CREATE_CHART, chart };
};

export const createChart = (id, title, code) => {
    return (dispatch) => {
        const chart = { id, title, code };
        charts.set(id, chart);
        return dispatch(actionCreate(chart));
    };
};

export const actionUpdate = (chart) => {
    return { type: UPDATE_CHART, chart };
};

export const updateChart = (id, title, code) => {
    return (dispatch) => {
        const chart = { id, title, code };
        charts.add(id, chart);
        return dispatch(actionUpdate(chart));
    };
};

export const actionDelete = (id) => {
    return { type: DELETE_CHART, id };
};

export const deleteChart = (id) => {
    return (dispatch) => {
        charts.remove(id);
        return dispatch(actionDelete(id));
    };
};
