import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Diagram from './Diagram';


describe('diagram component', () => {

    let rendered;

    const testId = "test-id";
    const testTitle = "Test Title";
    const testCode = "this-is-test-code";
    const chart = {id: testId, title: testTitle, code: testCode};

    beforeEach(() => {
        rendered = render(<MemoryRouter><Diagram {...chart}/></MemoryRouter>);
    });

    it('should print the title', () => {
        const { getAllByText } = rendered;
        expect(getAllByText(testTitle)).toHaveLength(2);
    });

    it('should print a textarea to add the markdown', () => {
        const { getByText } = rendered;
        expect(getByText(testCode)).toBeInTheDocument();
    });
});
