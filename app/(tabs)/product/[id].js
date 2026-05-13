import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { PRODUCTS } from "../../../data/products";
import { CartContext } from "../../../context/CartContext";
import AppHeader from "../../../components/AppHeader";
import { COLORS } from "../../../theme/colors";
import { useLanguage } from "../../../context/LanguageContext";

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.find((p) => p.id === Number(id));
  const { addToCart } = useContext(CartContext);
  const { t, formatPrice, language } = useLanguage();
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>{t('productNotFound')}</Text>
      </View>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    Alert.alert(
      t('addedToCart'),
      `${product.nom} ${t('addedSuccess')}`
    );
  };

  return (
    <View style={styles.screen}>
      <AppHeader userName="client" language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'}  />

      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.name}>{product.nom}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{formatPrice(product.prix)}</Text>

        <Pressable style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>{t('addToCart')}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: 18,
    paddingBottom: 28,
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 22,
    marginBottom: 20,
    backgroundColor: COLORS.softGray,
  },
  name: {
    fontSize: 28,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLORS.muted,
    lineHeight: 23,
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },
});