/*
 * Socket Context:
 * Context provides a way to pass data through the component tree
 * without having to pass props down manually at every level.
 * In this case, we are passing the socket object to the entire app.
 * This is useful because we can access the socket object from any
 * component in the app.
 */

import { createContext } from "react";

const SocketContext = createContext();

export default SocketContext;
