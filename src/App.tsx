import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Resumos from "./pages/Resumos";
import Palestra from "./pages/Palestra";
import Checklist from "./pages/Checklist";
import Perfil from "./pages/Perfil";
import IA from "./pages/IA";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Anotacoes from "./pages/Anotacoes";
import FocusWave from "./pages/FocusWave";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendering...");
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Home />} />
              <Route path="resumos" element={<Resumos />} />
              <Route path="palestra/:id" element={<Palestra />} />
              <Route path="checklist" element={<Checklist />} />
              <Route path="perfil" element={<Perfil />} />
              <Route path="ia" element={<IA />} />
              <Route path="admin" element={<Admin />} />
              <Route path="anotacoes" element={<Anotacoes />} />
              <Route path="focus-wave" element={<FocusWave />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;