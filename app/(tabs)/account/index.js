import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import AppHeader from '../../../components/AppHeader'
import { COLORS } from '../../../theme/colors'
import { useLanguage } from '../../../context/LanguageContext'

export default function AccountScreen () {
  const router = useRouter()
  const [nom] = useState('client')
  const [mdp, setMdp] = useState('1234')
  const [adresse, setAdresse] = useState('200 rue Client, Blainville')
  const { t, language, setLanguage } = useLanguage()

  return (
    <View style={styles.container}>
      <AppHeader
        userName={nom}
        language={language === 'fr' ? 'Fr' : language === 'en' ? 'En' : 'Auto'}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{t('account')}</Text>
        <Text style={styles.subtitle}>{t('modifyInfo')}</Text>

        <Text style={styles.label}>{t('name')}</Text>
        <TextInput
          style={[styles.input, styles.disabled]}
          value={nom}
          editable={false}
        />

        <Text style={styles.label}>{t('password')}</Text>
        <TextInput
          style={styles.input}
          value={mdp}
          onChangeText={setMdp}
          secureTextEntry
        />

        <Text style={styles.label}>{t('address')}</Text>
        <TextInput
          style={styles.input}
          value={adresse}
          onChangeText={setAdresse}
        />

        <Text style={styles.label}>{t('language')}</Text>
        <View style={styles.radioRow}>
          {['fr', 'en', 'auto'].map(code => (
            <Pressable
              key={code}
              onPress={() => setLanguage(code)}
              style={[
                styles.radioButton,
                language === code && styles.radioSelected
              ]}
            >
              <Text
                style={[
                  styles.radioText,
                  language === code && styles.radioTextSelected
                ]}
              >
                {code === 'fr' ? 'Fr' : code === 'en' ? 'En' : 'Auto'}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveText}>{t('save')}</Text>
        </Pressable>

        <Pressable
          style={styles.linkButton}
          onPress={() => router.push('/account/warehouses')}
        >
          <Text style={styles.linkText}>{t('warehouse')}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  content: { flex: 1, padding: 18 },
  title: { fontSize: 28, fontWeight: '800', color: COLORS.text },
  subtitle: {
    fontSize: 14,
    color: COLORS.muted,
    marginTop: 4,
    marginBottom: 18
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
  saveButton: {
    marginTop: 24,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: 'center'
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16
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
