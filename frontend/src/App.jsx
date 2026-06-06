import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background:
              "#0f172a",
            color:
              "#fff",
            border:
              "1px solid #1e293b",
          },
        }}
      />
    </>
  );
}

export default App;