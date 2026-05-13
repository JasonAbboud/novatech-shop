import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  Image
} from 'react-native'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import AppHeader from '../../components/AppHeader'
import { COLORS } from '../../theme/colors'
import { useLanguage } from '../../context/LanguageContext'

export default function CartScreen () {
  const { cart, increaseQty, decreaseQty, clearCart, total } =
    useContext(CartContext)
  const [showModal, setShowModal] = useState(false)
  const { t, formatPrice, language, currentLang } = useLanguage()
  const handleBuy = () => {
    if (cart.length === 0) return
    setShowModal(true)
  }

  const confirmBuy = () => {
    setShowModal(false)
    clearCart()
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.nom[currentLang] ?? item.nom.fr}</Text>
        <Text style={styles.meta}>
          {t('unitPrice')} : {formatPrice(item.prix)}
        </Text>
        <Text style={styles.meta}>
          {t('quantity')} : {item.quantity}
        </Text>
        <Text style={styles.totalLine}>
          {t('productTotal')} : {formatPrice(item.prix * item.quantity)}
        </Text>
      </View>

      <View style={styles.qty}>
        <Pressable
          style={styles.qtyButton}
          onPress={() => decreaseQty(item.id)}
        >
          <Text style={styles.qtyButtonText}>-</Text>
        </Pressable>

        <Pressable
          style={styles.qtyButton}
          onPress={() => increaseQty(item.id)}
        >
          <Text style={styles.qtyButtonText}>+</Text>
        </Pressable>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <AppHeader
        userName='client'
        language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{t('cart')}</Text>
        <Text style={styles.subtitle}>{t('manageCart')}</Text>

        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Text style={styles.emptyTitle}>{t('emptyCart')}</Text>
              <Text style={styles.emptyText}>{t('addFromDetails')}</Text>
            </View>
          }
          contentContainerStyle={
            cart.length === 0 ? styles.emptyContainer : styles.list
          }
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.total}>
          {t('grandTotal')} : {formatPrice(total)}
        </Text>
        <View style={styles.footerButtons}>
          <Pressable style={styles.secondary} onPress={clearCart}>
            <Text style={styles.secondaryText}>{t('clear')}</Text>
          </Pressable>
          <Pressable style={styles.primary} onPress={handleBuy}>
            <Text style={styles.primaryText}>{t('buy')}</Text>
          </Pressable>
        </View>
      </View>
      <Modal
        visible={showModal}
        transparent
        animationType='slide'
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>{t('orderConfirmed')}</Text>
            <Text style={styles.modalText}>{t('thankYou')}</Text>
            <Pressable style={styles.primary} onPress={confirmBuy}>
              <Text style={styles.primaryText}>{t('close')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },
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
  list: { paddingBottom: 16 },
  item: {
    flexDirection: 'row',
    padding: 14,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: COLORS.softGray
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '800', color: COLORS.text },
  meta: { fontSize: 13, color: COLORS.muted, marginTop: 2 },
  totalLine: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '700',
    marginTop: 4
  },
  qty: { flexDirection: 'column', gap: 8 },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.softBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDark
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  emptyBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text
  },
  emptyText: {
    marginTop: 6,
    color: COLORS.muted,
    textAlign: 'center'
  },
  footer: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    padding: 16
  },
  total: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10
  },
  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  secondary: {
    backgroundColor: COLORS.softGray,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14
  },
  secondaryText: {
    color: COLORS.text,
    fontWeight: '700'
  },
  primary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '800'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalCard: {
    width: '82%',
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 10
  },
  modalText: {
    fontSize: 15,
    color: COLORS.muted,
    textAlign: 'center',
    marginBottom: 18
  }
})
