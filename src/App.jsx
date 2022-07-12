import { AppRoutes } from "./routes/routes";
import { AuthProvider } from "./contexts/auth";
import { ToastContainer } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

export const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
      <ToastContainer theme="colored" />
    </>
  );
};
