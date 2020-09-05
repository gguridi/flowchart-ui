import React from 'react';
import { createStore, combineReducers } from 'redux';
import { fireEvent, screen } from '@testing-library/react';
import chartsReducer from '../reducers/charts';
import { renderRedux } from './Sidebar.test';
import Diagram from './Diagram';


describe('diagram container', () => {

    let store;

    const testId = "test-id";
    const testTitle = "Test Title";
    const testCode = "this-is-test-code";
    const match = {params: { id: testId }};
    const testCharts = {
        [testId]: {id: testId, title: testTitle, code: testCode},
    };

    beforeEach(() => {
        store = createStore(combineReducers({ charts: chartsReducer }), {
            charts: { charts: testCharts},
        });
        store.dispatch = jest.fn();
    });

    it('should pass chart from store to Diagram component', () => {
        const { getAllByText } = renderRedux(<Diagram match={match}/>, store);
        expect(getAllByText(testTitle)).toHaveLength(2);
    });

    it('should automatically use the code in the ', () => {
        const { getByText } = renderRedux(<Diagram match={match}/>, store);
        expect(getByText(testCode)).toBeInTheDocument();
    });
    
    it('should pass dispatch updateChart to Diagram component', () => {
        renderRedux(<Diagram match={match}/>, store);
        fireEvent.click(screen.getByText("Render"));
        expect(store.dispatch).toHaveBeenCalled();
    });
});
