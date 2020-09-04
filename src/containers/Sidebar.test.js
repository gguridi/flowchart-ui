import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import chartsReducer from '../reducers/charts';
import Sidebar from './Sidebar';


export const renderRedux = (component, store) => {
    const Wrapper = ({children}) => {
      return <Provider store={store}><MemoryRouter>{children}</MemoryRouter></Provider>
    };
    return render(component, {wrapper: Wrapper});
};


describe('sidebar container', () => {

    let store;

    const testId = "test-id";
    const testTitle = "Test Title";
    const testCode = "this-is-test-code";
    const testCharts = {
        [testId]: {id: testId, title: testTitle, code: testCode},
    };

    beforeEach(() => {
        store = createStore(combineReducers({ charts: chartsReducer }), {
            charts: { charts: testCharts},
        });
        store.dispatch = jest.fn();   
    });
    
    it('should pass charts from store to Sidebar component', () => {
        const { getByText } = renderRedux(<Sidebar/>, store);
        expect(getByText(testTitle)).toBeInTheDocument();
    });
    
    it('should pass dispatch deleteChart to Sidebar component', () => {
        const { container } = renderRedux(<Sidebar/>, store);
        fireEvent.click(container.querySelector('.trash-icon'));
        expect(store.dispatch).toHaveBeenCalled();
    });
    
});
