import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom'
import AddSession from './AddSession';


test("AddSession Dialogue", () => {
    const { getByTestId } = render(<AddSession />);
    const buttonElement = getByTestId('addSessionButton');
    fireEvent.click(buttonElement);
    expect(getByTestId('addSessionModal')).toBeInTheDocument();
}); 

test("AddSession Submit without input", () => {
    const { getByTestId } = render(<AddSession />);
    //Opens Dialogue box for adding new session
    const buttonElement = getByTestId('addSessionButton');
    fireEvent.click(buttonElement);

    //Submits without any fields inputed
    const submitButton = getByTestId('submitButton');
    fireEvent.click(submitButton);

    //expects 'error required fields' label
    const requiredFieldLabel = getByTestId('requiredFields');
    expect(requiredFieldLabel).toBeInTheDocument();

}); 

test("Closing AddSession Dialogue", () => {
    const { getByTestId } = render(<AddSession />);
    const buttonElement = getByTestId('addSessionButton');
    fireEvent.click(buttonElement);

    //Presses close
    const closeButton = getByTestId('closeButton');
    fireEvent.click(closeButton);

    expect(getByTestId('addSessionModal')).not.toBeInTheDocument();    

}); 