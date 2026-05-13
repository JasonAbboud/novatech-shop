import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useRouter } from 'expo-router'
import { PRODUCTS } from '../../data/products'
import AppHeader from '../../components/AppHeader'
import { COLORS } from '../../theme/colors'
import { useLanguage } from '../../context/LanguageContext'

export default function ProductsScreen () {
  const router = useRouter()
  const { t, language, currentLang } = useLanguage()
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/product/${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.nom[currentLang] ?? item.nom.fr}</Text>
    </Pressable>
  )
  
  return (
    <View style={styles.container}>
      <AppHeader
        userName='client'
        language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{t('products')}</Text>
        <Text style={styles.subtitle}>{t('chooseAccessories')}</Text>

        <FlatList
          data={PRODUCTS}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 16
  },
  list: {
    paddingBottom: 24
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 18,
    marginBottom: 12,
    backgroundColor: COLORS.softGray
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.text
  }
})
