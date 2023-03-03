import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom'
import SignUp from './SignUp';


test("Click Signup without fields", () => {
    const { getByTestId } = render(<SignUp />);
    
    //Presses sign up button without any fields
    const submitButton = getByTestId('submitButton');
    fireEvent.click(submitButton);

    //Expects alert to be visible
    expect(getByTestId('requiredAlert')).toBeVisible();    
}); 
