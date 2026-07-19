import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminLogin from "./pages/AdminLogin";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AddPlayer from "./pages/AddPlayer";
import ManagePlayers from "./pages/ManagePlayers";
import EditPlayer from "./pages/EditPlayer";
import ManageGallery from "./pages/ManageGallery";
import ManageAchievements from "./pages/ManageAchievements";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/players"
          element={
            <ProtectedAdminRoute>
              <ManagePlayers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/players/add"
          element={
            <ProtectedAdminRoute>
              <AddPlayer />
            </ProtectedAdminRoute>
          }/>

          <Route
            path="/admin/players/:id/edit"
            element={
              <ProtectedAdminRoute>
                <EditPlayer />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedAdminRoute>
                <ManageGallery />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/achievements"
            element={
              <ProtectedAdminRoute>
                <ManageAchievements />
              </ProtectedAdminRoute>
            }
          />

      </Routes>
    </BrowserRouter>
  );
}

export default App;