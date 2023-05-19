import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import User from "./pages/User";

function App() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/github-finder/"
          element={<Search />}
        />
        <Route
          exact
          path="/github-finder/user/:username"
          element={<User />}
        />
      </Routes>
    </>
  );
}

export default App;
