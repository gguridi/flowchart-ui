import React from 'react';
import { createStore, combineReducers } from 'redux';
import { fireEvent, screen } from '@testing-library/react';
import chartsReducer from '../reducers/charts';
import { renderRedux } from './Sidebar.test';
import NewChart from './NewChart';


describe('new chart container', () => {

    let store;

    beforeEach(() => {
        store = createStore(combineReducers({ charts: chartsReducer }), {});
        store.dispatch = jest.fn();
    });

    it('should have a button to create a new chart', () => {
        const { getByText } = renderRedux(<NewChart/>, store);
        expect(getByText("Create")).toBeInTheDocument();
    });

    it('should have an input to set the chart name', () => {
        renderRedux(<NewChart/>, store);
        fireEvent.input(screen.getByPlaceholderText("Name of the Chart"), "Chart Title");
    });
    
    it('should pass dispatch createChart to NewChart component', () => {
        renderRedux(<NewChart/>, store);
        fireEvent.click(screen.getByText("Create"));
        expect(store.dispatch).toHaveBeenCalled();
    });    
});
