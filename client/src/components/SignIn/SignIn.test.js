import React from 'react';
import { render, getByRole, getByTestId, fireEvent, toBeEqual } from "@testing-library/react";
import { toBeInTheDocument } from '@testing-library/jest-dom'
import SignIn from './SignIn';

const onChangeTextMock = jest.fn();

test("SignIn", () => {
    const { getByTestId } = render(<SignIn/>);
    //Checks if email and password input boxes are present
    const emailBox = getByTestId('addEmail');
    const passwordBox = getByTestId('addPassword');

    expect(emailBox).toBeInTheDocument();
    expect(passwordBox).toBeInTheDocument();

}); 
