import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import User from "./pages/User";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Search />}
        />
        <Route
          exact
          path="user/:username"
          element={<User />}
        />
      </Routes>
    </>
  );
}

export default App;
