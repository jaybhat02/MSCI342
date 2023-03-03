import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

test("Send Add Session API call", () => {
    const mock = new MockAdapter(axios);
    mock.onPost('/api/addSession')
});