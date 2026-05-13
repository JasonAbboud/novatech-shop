import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function AccueilScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const { t } = useLanguage();
  const [nom, setNom] = useState("");
  const [mdp, setMdp] = useState("");

  const handleLogin = () => {
    if (!nom.trim() || !mdp.trim()) {
      Alert.alert(t('error'), t('enterCredentials'));
      return;
    }

    const result = login(nom, mdp);

    if (!result.success) {
      Alert.alert(t('loginDenied'), result.message);
      return;
    }

    if (result.user.admin) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/products");
    }
  };

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.topSection}>
          <Image
            source={require("../assets/images/NovaTech.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.companyName}>NovaTech Shop</Text>
          <Text style={styles.tagline}>{t('tagline')}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t('login')}</Text>

          <TextInput
            style={styles.input}
            placeholder={t('username')}
            value={nom}
            onChangeText={setNom}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={mdp}
            onChangeText={setMdp}
            secureTextEntry
          />

          <Pressable style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{t('signIn')}</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          {t('madeBy')}
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#0F172A"
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 70,
    paddingBottom: 35,
  },
  topSection: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 34,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "#CBD5E1",
    marginTop: 8,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#111827",
    marginBottom: 18,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 50
  },
});