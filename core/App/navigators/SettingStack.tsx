import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useConfiguration } from '../contexts/configuration'
import { useStore } from '../contexts/store'
import { useTheme } from '../contexts/theme'
import Language from '../screens/Language'
import Onboarding from '../screens/Onboarding'
import { createCarouselStyle } from '../screens/OnboardingPages'
import PINCreate from '../screens/PINCreate'
import PINRecreate from '../screens/PINRecreate'
import Settings from '../screens/Settings'
import UseBiometry from '../screens/UseBiometry'
import { Screens, SettingStackParams } from '../types/navigators'
import { testIdWithKey } from '../utils/testable'

import { createDefaultStackOptions } from './defaultStackOptions'

const SettingStack: React.FC = () => {
  const Stack = createStackNavigator<SettingStackParams>()
  const theme = useTheme()
  const [store] = useStore()
  const { t } = useTranslation()
  const { pages, terms, developer } = useConfiguration()
  const defaultStackOptions = createDefaultStackOptions(theme)
  const OnboardingTheme = theme.OnboardingTheme
  const carousel = createCarouselStyle(OnboardingTheme)

  return (
    <Stack.Navigator screenOptions={{ ...defaultStackOptions }}>
      <Stack.Screen
        name={Screens.Settings}
        component={Settings}
        options={{ title: t('Screens.Settings'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Language}
        component={Language}
        options={{ title: t('Screens.Language'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.UseBiometry}
        component={UseBiometry}
        options={{
          title: t('Screens.Biometry'),
          headerLeft: store.preferences.biometryPreferencesUpdated ? () => null : undefined,
          headerBackTestID: testIdWithKey('Back'),
        }}
      />
      <Stack.Screen
        name={Screens.RecreatePIN}
        component={PINRecreate}
        options={{ title: t('Screens.ChangePIN'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.CreatePIN}
        component={PINCreate}
        options={{ title: t('Screens.ChangePIN'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Terms}
        component={terms}
        options={{ title: t('Screens.Terms'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen
        name={Screens.Developer}
        component={developer}
        options={{ title: t('Screens.Developer'), headerBackTestID: testIdWithKey('Back') }}
      />
      <Stack.Screen name={Screens.Onboarding} options={{ title: t('Screens.Onboarding') }}>
        {(props) => (
          <Onboarding
            {...props}
            nextButtonText={t('Global.Next')}
            previousButtonText={t('Global.Back')}
            pages={pages(() => null, OnboardingTheme)}
            style={carousel}
            disableSkip={true}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  )
}

export default SettingStack
