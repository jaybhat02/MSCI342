import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom'
import AddSession from './AddSession';


test("AddSession", () => {
    const { getByTestId } = render(<AddSession />);
    const buttonElement = getByTestId('addSessionButton');
    fireEvent.click(buttonElement);
    expect(getByTestId('addSessionModal')).toBeInTheDocument();


}); 
