import React from "react"
import {
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Dimensions,
} from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Icon } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { spacing } from "@/theme/spacing"

const { width: screenWidth } = Dimensions.get("window")

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets()
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($tabBarContainer)}>
      <View style={themed($tabBar)}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key]
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

          const isFocused = state.index === index
          const isCamera = route.name === "Camera"

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params)
            }
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            })
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              // testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                !isCamera && themed($tabItem),
                isCamera && themed($cameraTabItem),
                isFocused && !isCamera && themed($activeTabItem),
                isFocused && isCamera && themed($cameraActiveTabLabel),
              ]}
            >
              <View style={[!isCamera && themed($tabContent), isCamera && themed($cameraTabContent)]}>
                <Icon
                  icon={isCamera ? "camera" : route.name === "Settings" ? "settings" : "more"}
                  color={isCamera ? theme.colors.tint : ((isFocused) ? theme.colors.tint : theme.colors.tintInactive)}
                />
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const $tabBarContainer: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  paddingBottom: 0,
})

const $tabBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  backgroundColor: colors.background,
  paddingHorizontal: spacing.md,
  alignItems: "center",
  height: 80,
})

const $tabItem: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  // paddingTop: spacing.lg,
  height: 40,
  // marginVertical: 20,
})

const $cameraTabContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
})

const $cameraTabItem: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.background,
  // color: colors.text,
  borderRadius: 50,
  height: 70,
  width: 70,
  marginBottom: 20,
  paddingTop: 20,
  borderWidth: 3,
  borderColor: colors.tint,
  shadowColor: colors.tint,
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 8,
  alignItems: "center",
  justifyContent: "center",
})

const $activeTabItem: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderRadius: 35,
  // paddingTop: spacing.lg,
  // marginVertical: 20,
})

const $cameraActiveTabLabel: ThemedStyle<ViewStyle> = ({ colors }) => ({
  // borderRadius: 50,
  backgroundColor: colors.tintInactive,
  color: colors.background,

})

const $tabContent: ThemedStyle<ViewStyle> = () => ({
  alignItems: "center",
  justifyContent: "center",
})

const $tabLabel: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: colors.text,
  marginTop: 4,
})

const $activeTabLabel: ThemedStyle<TextStyle> = ({ colors }) => {
  return ({
    color: colors.tint,
  })
}