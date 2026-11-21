import { RouterProvider } from "react-router/dom";
import { AuthProvider } from "@/Features/auth";
import { router } from "@/routes";
import ToastProvider from "@/components/ui/Toast";
export default function App() {
  return (

    <AuthProvider>
     <ToastProvider >
      <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}
