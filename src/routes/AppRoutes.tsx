import Layout from "components/layout";
import LandingPage from "pages/LandingPage/LandingPage";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import Room from "pages/Room/Room";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />

          {/* protected routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/room/:roomId" element={<Room />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
