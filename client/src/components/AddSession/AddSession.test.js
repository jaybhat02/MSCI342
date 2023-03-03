import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeInTheDocument, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument} from '@testing-library/jest-dom/extent-expect';
import AddSession from './AddSession';


test("AddSession", () => {
    const { getByTestId } = render(<AddSession />);
    const handleClick = jest.fn();
    const buttonElement = getByTestId('addSessionButton');
    // const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(getByTestId('addSessionModal')).toBeInTheDocument();
   // expect(toBeInTheDocument(getByTestId('addSessionModal'))).toBeEqual(true);

}); 
