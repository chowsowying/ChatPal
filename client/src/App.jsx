import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Socket.io
import SocketContext from "./context/socketContex";
const socket = io(import.meta.env.VITE_APP_SOCKET_ENDPOINT);

function App() {
  // Redux
  const { user } = useSelector((state) => state.user);
  const { token } = user;

  return (
    <div className="dark">
      <Toaster />
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={token ? <Home socket={socket} /> : <Navigate to="/login" />}
            />
            <Route exact path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
            <Route exact path="/register" element={!token ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </Router>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
