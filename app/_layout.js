import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { LanguageProvider } from "../context/LanguageContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <CartProvider>
        <LanguageProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </LanguageProvider>
      </CartProvider>
    </AuthProvider>
  );
}