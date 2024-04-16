import API_URL from './API';
import { io } from 'socket.io-client';

export const socket = io(API_URL);
