import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView
} from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import AppHeader from '../../../components/AppHeader'
import { COLORS } from '../../../theme/colors'
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
  Polyline
} from 'react-native-maps'
import routes from '../../../data/route.json'
import { useLanguage } from '../../../context/LanguageContext'

export default function WareHouse () {
  const entrepots = [
    { id: 1, nom: '1', latitude: 45.5, longitude: -73.56 },
    { id: 2, nom: '2', latitude: 45.54, longitude: -73.9 },
    { id: 3, nom: '3', latitude: 45.57, longitude: -73.8 },
    { id: 4, nom: '4', latitude: 45.6, longitude: -73.55 },
    { id: 5, nom: '5', latitude: 45.4, longitude: -73.5 }
  ]
  const initialRegion = {
    latitude: 45.6480248,
    longitude: -73.8083533,
    latitudeDelta: 1,
    longitudeDelta: 1
  }
  const [region, setRegion] = useState(initialRegion)
  const [selected, setSelected] = useState(null)
  const { t, language } = useLanguage()

  return (
    <View style={styles.container}>
      <AppHeader userName='client' language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'}/>
      <View style={styles.content}>
        <View style={{ flex: 1 / 4 }}>
          <ScrollView>
            {entrepots.map(entrepot => (
              <Pressable
                key={entrepot.id}
                onPress={() => {
                  setSelected(entrepot.id)
                  setRegion({
                    latitude: entrepot.latitude,
                    longitude: entrepot.longitude,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
                  })
                }}
                style={[
                  styles.Button,
                  { backgroundColor: selected == entrepot.id ? 'red' : 'blue' }
                ]}
              >
                <Text style={styles.btnText}>{t('warehouse')} {entrepot.nom}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChangeComplete={setRegion}
        >
          <Marker
            title={t('home')}
            image={require('../../../assets/images/House_Logo.png')}
            coordinate={{
              latitude: initialRegion.latitude,
              longitude: initialRegion.longitude
            }}
          />
          {entrepots.map(entrepot => (
            <Marker
              key={entrepot.id}
              title={`${t('warehouse')} ${entrepot.nom}`}
              image={require('../../../assets/images/Warehouse_Logo.png')}
              coordinate={{
                latitude: entrepot.latitude,
                longitude: entrepot.longitude
              }}
              onPress={() => setSelected(entrepot.id)}
            />
          ))}
          {entrepots.map(entrepot => (
            <Circle
              key={entrepot.id}
              center={{
                latitude: entrepot.latitude,
                longitude: entrepot.longitude
              }}
              radius={5000}
              strokeColor='blue'
              fillColor='rgba(148, 155, 255, 0.5)'
            />
          ))}
          <Polyline coordinates={routes} strokeColor='green' strokeWidth={2} />
        </MapView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: 18, paddingTop: 0 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 18
  },
  map: {
    flex: 3 / 4
  },
  label: {
    fontSize: 14,
    color: COLORS.muted,
    marginBottom: 6,
    marginTop: 12,
    fontWeight: '600'
  },
  input: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  disabled: {
    backgroundColor: COLORS.softGray
  },
  radioRow: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 10
  },
  radioButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface
  },
  radioSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary
  },
  radioText: {
    color: COLORS.text,
    fontWeight: '600'
  },
  radioTextSelected: {
    color: '#FFFFFF'
  },
  Button: {
    marginVertical: 2,
    backgroundColor: 'blue',
    borderRadius: 16,
    paddingVertical: 8,
    alignItems: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 12
  },
  linkButton: {
    marginTop: 14,
    alignItems: 'center'
  },
  linkText: {
    color: COLORS.primaryDark,
    fontWeight: '700',
    fontSize: 15
  }
})
