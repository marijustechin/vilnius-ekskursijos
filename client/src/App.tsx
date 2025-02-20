import { BrowserRouter, Route, Routes } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LoginRegisterPage } from "./pages/LoginRegisterPage";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminHomePage } from "./pages/admin/AdminHomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { useAppDispatch } from "./store/store";
import { useEffect } from "react";
import { restoreSession } from "./store/features/user/authSlice";

function App() {
  // pasileidziant programai automatiskai atnaujinam
  // refreshTokena - atstatom sesija is localStorage
  // arba jei pasibaiges accessTokeno galiojimas
  // darom refresh
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="prisijungimas" element={<LoginRegisterPage />} />
          <Route path="profilis" element={<ProfilePage />} />
        </Route>
        <Route path="/suvestine" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
