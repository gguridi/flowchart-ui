import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Sidebar from './Sidebar';


describe('sidebar component', () => {

    let rendered, deleteAction;

    const testCharts = {
        "test-a": {id: "test-a", title: "TestA", code: ""},
        "test-b": {id: "test-b", title: "TestB", code: ""},
    };

    beforeEach(() => {
        deleteAction = jest.fn();
        rendered = render(<MemoryRouter><Sidebar charts={testCharts} deleteChart={deleteAction}/></MemoryRouter>);
    });

    it('should print the list of charts', () => {
        const { getByText } = rendered;
        expect(getByText("TestA")).toBeInTheDocument();
        expect(getByText("TestB")).toBeInTheDocument();
    });

    it('should print a trash icon to delete the chart', () => {
        const { getByTestId } = rendered;
        expect(getByTestId("trash-test-a")).toBeInTheDocument();
        expect(getByTestId("trash-test-b")).toBeInTheDocument();
    });

    describe("deleting a chart", () => {

        beforeEach(() => {
            fireEvent.click(screen.getByTestId("trash-test-a"));
        });

        it('should call delete action', () => {
            expect(deleteAction).toHaveBeenCalled();
        });

        it('should call delete action with the id to delete', () => {
            expect(deleteAction.mock.calls[0][0]).toBe("test-a");
        }); 
    });
   
    it('has a button to create a new chart', () => {
        const { getByText } = rendered;
        expect(getByText("+ New Chart")).toBeInTheDocument();
    });
});
