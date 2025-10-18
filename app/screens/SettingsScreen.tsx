import { FC, useCallback, useMemo } from "react"
import {
  LayoutAnimation,
  Linking,
  Platform,
  TextStyle,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native"
import * as Application from "expo-application"

import { Button } from "@/components/Button"
import { ListItem } from "@/components/ListItem"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAuth } from "@/context/AuthContext"
import { isRTL } from "@/i18n"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { $styles } from "@/theme/styles"
import type { ThemedStyle } from "@/theme/types"

/**
 * @param {string} url - The URL to open in the browser.
 * @returns {void} - No return value.
 */
function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
}

const usingHermes = typeof HermesInternal === "object" && HermesInternal !== null

export const SettingsScreen: FC<DemoTabScreenProps<"Settings">> = function SettingsScreen(
  _props,
) {
  const { setThemeContextOverride, themeContext, themed } = useAppTheme()
  const { logout } = useAuth()

  // @ts-expect-error
  const usingFabric = global.nativeFabricUIManager != null

  const demoReactotron = useMemo(
    () => async () => {
      if (__DEV__) {
        console.tron.display({
          name: "DISPLAY",
          value: {
            appId: Application.applicationId,
            appName: Application.applicationName,
            appVersion: Application.nativeApplicationVersion,
            appBuildVersion: Application.nativeBuildVersion,
            hermesEnabled: usingHermes,
          },
          important: true,
        })
      }
    },
    [],
  )

  const toggleTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut) // Animate the transition
    setThemeContextOverride(themeContext === "dark" ? "light" : "dark")
  }, [themeContext, setThemeContextOverride])

  // Resets the theme to the system theme
  const colorScheme = useColorScheme()
  const resetTheme = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setThemeContextOverride(undefined)
  }, [setThemeContextOverride])

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top"]}
      contentContainerStyle={[$styles.container, themed($container)]}
    >
      <Text style={themed($title)} preset="heading">Settings</Text>

      <View style={themed($itemsContainer)}>
        <Button style={themed($button)} onPress={toggleTheme} text={`Toggle Theme: ${themeContext}`} />
      </View>
      <View style={themed($buttonContainer)}>
        <Button style={themed($button)} tx="common:logOut" onPress={logout} />
      </View>
      <View style={themed($footerContainer)}>
        <Text>{Application.applicationName} : {Application.nativeApplicationVersion}</Text>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingBottom: spacing.xxl,
})

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
  textAlign: 'center',
})



const $itemsContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginVertical: spacing.xl,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
  borderRadius: spacing.md,
})

const $buttonContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.md,
})

const $footerContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxl,
  alignItems: "center",
})