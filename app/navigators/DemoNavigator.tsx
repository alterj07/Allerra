import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { CustomTabBar } from "@/components/CustomTabBar"
import { EpisodeProvider } from "@/context/EpisodeContext"
import { CameraScreen } from "@/screens/CameraScreen"
import { MiscScreen } from "@/screens/MiscScreen"
import { SettingsScreen } from "@/screens/SettingsScreen"

import type { DemoTabParamList } from "./navigationTypes"

const Tab = createBottomTabNavigator<DemoTabParamList>()

/**
 * This is the main navigator for the demo screens with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 * @returns {JSX.Element} The rendered `DemoNavigator`.
 */
export function DemoNavigator() {

  return (
    <EpisodeProvider>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name="Misc"
          component={MiscScreen}
          options={{
            tabBarLabel: "Misc",
          }}
        />

        <Tab.Screen
          name="Camera"
          component={CameraScreen}
          options={{
            tabBarLabel: "Camera",
          }}
        />

        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: "Settings",
          }}
        />
      </Tab.Navigator>
    </EpisodeProvider>
  )
}

