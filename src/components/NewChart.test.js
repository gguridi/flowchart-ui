import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import NewChart from './NewChart';


describe('new chart component', () => {

    let rendered, create;

    beforeEach(() => {
        create = jest.fn();
        rendered = render(<MemoryRouter><NewChart createChart={create}/></MemoryRouter>);
    });

    it('should print an input text to set the chart name', () => {
        const { getByPlaceholderText } = rendered;
        expect(getByPlaceholderText("Name of the Chart")).toBeInTheDocument();
    });

    it('should print a button to create the new chart', () => {
        const { getByText } = rendered;
        expect(getByText("Create")).toBeInTheDocument();
    });

    describe("creating new chart", () => {

        beforeEach(() => {
            const input = screen.getByPlaceholderText("Name of the Chart");
            fireEvent.change(input, { target: { value: "Chart Title" } });
            fireEvent.click(screen.getByText("Create"));
        });

        it('should call create action upon clicking submit', () => {
            expect(create).toHaveBeenCalled();
        });

        it('should call create action with the new id', () => {
            expect(create.mock.calls[0][0]).toBe("chart-title");
        });

        it('should call create action with the new title', () => {
            expect(create.mock.calls[0][1]).toBe("Chart Title");
        });

        it('should call create action with code empty', () => {
            expect(create.mock.calls[0][2]).toBe("");
        });
    });
});
