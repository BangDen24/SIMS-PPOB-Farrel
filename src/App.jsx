import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import TopupPage from "./pages/topupPage";
import TransactionPage from "./pages/transactionPage";
import AccountPage from "./pages/accountPage";
import HomePage from "./pages/homePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/ui/Layout";
import PaymentPage from "./pages/paymentPage";
import NotFoundPage from "./pages/notFoundPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/topup"
          element={
            <ProtectedRoute>
              <Layout>
                <TopupPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transaction"
          element={
            <ProtectedRoute>
              <Layout>
                <TransactionPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Layout>
                <AccountPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment/:serviceCode"
          element={
            <ProtectedRoute>
              <Layout>
                <PaymentPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
