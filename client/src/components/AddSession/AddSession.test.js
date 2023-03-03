import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom'
import AddSession from './AddSession';


test("AddSession Dialogue", () => {
    const { getByTestId } = render(<AddSession />);
    
    //Presses button to open Dialogue box
    const buttonElement = getByTestId('addSessionButton');
    fireEvent.click(buttonElement);

    //Expects Dialogue box to be open
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
