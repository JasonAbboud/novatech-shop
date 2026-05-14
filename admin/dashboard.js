import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Alert,
  TextInput,
  Modal,
  ScrollView
} from 'react-native'
import { useState } from 'react'
import { PRODUCTS } from '../../data/products'
import AppHeader from '../../components/AppHeader'
import { COLORS } from '../../theme/colors'
import { useLanguage } from '../../context/LanguageContext'

export default function Dashboard () {
  const [products, setProducts] = useState(PRODUCTS)
  const [showModal, setShowModal] = useState(false)
  const [nomFr, setNomFr] = useState('')
  const [nomEn, setNomEn] = useState('')
  const [descFr, setDescFr] = useState('')
  const [descEn, setDescEn] = useState('')
  const [prix, setPrix] = useState('')
  const [image, setImage] = useState('')
  const { t, formatPrice, language, currentLang} = useLanguage()

  const Delete = id => {
    // https://reactnative.dev/docs/alert
    Alert.alert(t('delete'), t('confirmDelete'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: () => {
          const newProducts = []
          for (const p of products) {
            if (p.id !== id) {
              newProducts.push(p)
            }
          }
          setProducts(newProducts)
        }
      }
    ])
  }

  const Add = () => {
    if (!nomFr || !prix || !nomEn) {
      Alert.alert(t('error'), t('fillRequired'))
      return
    }
    const newProduct = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      nom: { fr: nomFr, en: nomEn},
      description: { fr: descFr, en: descEn},
      prix: parseFloat(prix),
      image: image || 'https://static.thenounproject.com/png/5191452-200.png'
    }
    setProducts([...products, newProduct])
    setShowModal(false)
    setNomFr('')
    setNomEn('')
    setDescFr('')
    setDescEn('')
    setPrix('')
    setImage('')
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.nom[currentLang] ?? item.nom.fr}</Text>
        <Text style={styles.price}>{formatPrice(item.prix)}</Text>
      </View>
      <Pressable style={styles.deleteBtn} onPress={() => Delete(item.id)}>
        <Text style={styles.deleteBtnText}>{t('delete')}</Text>
      </Pressable>
    </View>
  )

  return (
    <View style={styles.container}>
      <AppHeader userName='admin' language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'} />

      <View style={styles.content}>
        <Text style={styles.title}>{t('adminDashboard')}</Text>
        <Text style={styles.subtitle}>{t('manageProducts')}</Text>

        <Pressable style={styles.addBtn} onPress={() => setShowModal(true)}>
          <Text style={styles.addBtnText}>+ {t('addProduct')}</Text>
        </Pressable>

        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
      {/* https://reactnative.dev/docs/modal */}
      <Modal visible={showModal} transparent animationType='slide'>
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('newProduct')}</Text>

            <TextInput
              style={styles.input}
              placeholder={t('nameFr')}
              value={nomFr}
              onChangeText={setNomFr}
            />
            <TextInput
              style={styles.input}
              placeholder={t('nameEn')}
              value={nomEn}
              onChangeText={setNomEn}
            />
            <TextInput
              style={styles.input}
              placeholder={t('descFr')}
              value={descFr}
              onChangeText={setDescFr}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder={t('descEn')}
              value={descEn}
              onChangeText={setDescEn}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder={t('price')}
              value={prix}
              onChangeText={setPrix}
              keyboardType='numeric'
            />
            <TextInput
              style={styles.input}
              placeholder={t('imageUrl')}
              value={image}
              onChangeText={setImage}
            />

            <Pressable style={styles.addBtn} onPress={Add}>
              <Text style={styles.addBtnText}>{t('add')}</Text>
            </Pressable>
            <Pressable
              style={styles.cancelBtn}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelBtnText}>{t('cancel')}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 12
  },
  list: { paddingBottom: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: COLORS.softGray
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  price: { fontSize: 13, color: COLORS.primary, marginTop: 4 },
  deleteBtn: {
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12
  },
  deleteBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  addBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    marginBottom: 12
  },
  addBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    padding: 20
  },
  modalCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16
  },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10
  },
  cancelBtn: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 12
  },
  cancelBtnText: { color: COLORS.muted, fontWeight: '700' }
})
