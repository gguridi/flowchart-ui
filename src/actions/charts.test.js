import { charts, CREATE_CHART, UPDATE_CHART, DELETE_CHART, SELECT_CHART, createChart, updateChart, deleteChart, selectChart } from './charts';

describe('charts actions', () => {
    let dispatch;

    const testId = "test-id";
    const testTitle = "Test Title";
    const testCode = "this-is-test-code";
    const testChart = {id: testId, title: testTitle, code: testCode};

    beforeEach(() => {
        dispatch = jest.fn();
    });

    describe('create', () => {

        beforeEach(async () => {
            charts.set = jest.fn();
            await createChart(testId, testTitle, testCode)(dispatch);
        });

        it('should call store saving the chart with the id', () => {
            expect(charts.set.mock.calls[0][0]).toEqual(testId);
        });

        it('should call store saving the chart as object', () => {
            expect(charts.set.mock.calls[0][1]).toMatchObject(testChart);
        });

        it('should return an action with type CREATE_CHART', () => {
            expect(dispatch.mock.calls[0][0].type).toBe(CREATE_CHART);
        });

        it('should return an action with the chart given as input', () => {
            expect(dispatch.mock.calls[0][0].chart).toMatchObject(testChart);
        });
    });

    describe('update', () => {

        beforeEach(async () => {
            charts.add = jest.fn();
            await updateChart(testId, testTitle, testCode)(dispatch);
        });

        it('should call store updating the chart with the id', () => {
            expect(charts.add.mock.calls[0][0]).toEqual(testId);
        });

        it('should call store updating the chart as object', () => {
            expect(charts.add.mock.calls[0][1]).toMatchObject(testChart);
        });

        it('should return an action with type UPDATE_CHART', () => {
            expect(dispatch.mock.calls[0][0].type).toBe(UPDATE_CHART);
        });

        it('should return an action with the chart given as input', () => {
            expect(dispatch.mock.calls[0][0].chart).toMatchObject(testChart);
        });
    });

    describe('delete', () => {

        beforeEach(async () => {
            charts.remove = jest.fn();
            await deleteChart(testId)(dispatch);
        });

        it('should call store removing the chart with the id', () => {
            expect(charts.remove.mock.calls[0][0]).toEqual(testId);
        });

        it('should return an action with type DELETE_CHART', () => {
            expect(dispatch.mock.calls[0][0].type).toBe(DELETE_CHART);
        });

        it('should return an action with the id given as input', () => {
            expect(dispatch.mock.calls[0][0].id).toEqual(testId);
        });
    });

    describe('select', () => {

        beforeEach(async () => {
            await selectChart(testId)(dispatch);
        });

        it('should return an action with type SELECT_CHART', () => {
            expect(dispatch.mock.calls[0][0].type).toBe(SELECT_CHART);
        });

        it('should return an action with the selected id', () => {
            expect(dispatch.mock.calls[0][0].id).toBe(testId);
        });
    });
});
