import { actionCreate, actionUpdate, actionDelete, actionSelect } from '../actions/charts';
import chartsReducer from './charts';

describe('charts reducers', () => {
    let state, newState;

    const testId = "test-id";
    const testTitle = "Test Title";
    const testCode = "this-is-test-code";
    const testChart = {id: testId, title: testTitle, code: testCode};

    beforeEach(() => {
        state = {};
    });

    describe('given CREATE_CHART action', () => {

        beforeEach(() => {
            newState = chartsReducer(state, actionCreate(testChart));
        });

        it('should append the chart to the state charts object', () => {
            expect(Object.keys(newState.charts)).toHaveLength(1);
        });

        it('should add the chart object using the id as key', () => {
            expect(newState.charts[testId]).toMatchObject(testChart);
        });

        it('should replace the chart if it already exists', () => {
            const newChart = {...testChart, title: "New Title"};
            newState = chartsReducer(newState, actionCreate(newChart));
            expect(Object.keys(newState.charts)).toHaveLength(1);
            expect(newState.charts[testId]).toMatchObject(newChart);
        });
    });

    describe('given UPDATE_CHART action', () => {

        const newTitle = "New Title";
        const newCode = "this-is-a-new-code";
        const newChart = {...testChart, title: newTitle, code: newCode};

        beforeEach(() => {
            newState = chartsReducer(state, actionCreate(testChart));
            newState = chartsReducer(state, actionUpdate(newChart));
        });

        it('should replace the chart to the state charts object', () => {
            expect(Object.keys(newState.charts)).toHaveLength(1);
        });

        it('should replace the chart object using the id as key', () => {
            expect(newState.charts[testId]).toMatchObject(newChart);
        });

        it('should create the chart if it does not exist', () => {
            const newChart = {...testChart, id: "New ID"};
            newState = chartsReducer(newState, actionUpdate(newChart));
            expect(Object.keys(newState.charts)).toHaveLength(2);
            expect(newState.charts["New ID"]).toMatchObject(newChart);
        });
    });

    describe('given DELETE_CHART action', () => {

        beforeEach(() => {
            newState = chartsReducer(state, actionCreate(testChart));
            newState = chartsReducer(state, actionDelete(testId));
        });

        it('should remove the chart to the state charts object', () => {
            expect(Object.keys(newState.charts)).toHaveLength(0);
        });

        it('should not raise an error if the chart does not exist', () => {
            newState = chartsReducer(newState, actionDelete("unknown"));
            expect(Object.keys(newState.charts)).toHaveLength(0);
        });
    });

    describe('given SELECT_CHART action', () => {

        beforeEach(() => {
            newState = chartsReducer(state, actionSelect(testId));
        });

        it('should set the chart selected', () => {
            expect(newState.selected).toBe(testId);
        });

        it('should override the previous chart selected', () => {
            const newTestId = "another-test";
            newState = chartsReducer(newState, actionSelect(newTestId));
            expect(newState.selected).toBe(newTestId);
        });
    });
});
