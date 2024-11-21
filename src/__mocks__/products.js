import {v4 as uuid} from 'uuid';

export const products = [
    {
        id: uuid(),
        expiredAt: '2024-03-27T09:32:18Z',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        icon: 'Bluetooth',
        title: 'Blue Label'
    },
    {
        id: uuid(),
        expiredAt: '2024-05-31T09:32:18Z',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        icon: 'Handshake',
        title: 'Green Label'
    }
];
