import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider, theme } from "antd";
import { store } from "./store/store";
import Navbar from "./components/Navbar";
import Users from "./pages/User";
import UserDetails from "./pages/UserDetails";
import NotFound from "./pages/NotFound";

const App = () => (
  <Provider store={store}>
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        token: {
          colorPrimary: '#3b82f6',
          borderRadius: 8,
          fontSize: 14,
        },
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/user/:id" element={<UserDetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </Provider>
);

export default App;
