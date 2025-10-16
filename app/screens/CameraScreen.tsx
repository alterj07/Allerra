import { FC, useCallback, useEffect, useRef, useState } from "react"
import { View, ViewStyle, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, TextStyle, Linking, Platform } from "react-native"
import { Camera, useCameraDevice, useCameraPermission, PhotoFile } from "react-native-vision-camera"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { Button } from "@/components/Button"
import { DemoTabScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { RefreshCcwDot } from 'lucide-react-native'

export const CameraScreen: FC<DemoTabScreenProps<"Camera">> = function CameraScreen(_props) {
  const { themed, theme } = useAppTheme()
  const camera = useRef<Camera>(null)
  const { hasPermission, requestPermission } = useCameraPermission()
  
  const [cameraPosition, setCameraPosition] = useState<"back" | "front">("back")
  const [flash, setFlash] = useState<"off" | "on">("off")
  const [isCapturing, setIsCapturing] = useState(false)
  const [lastPhoto, setLastPhoto] = useState<PhotoFile | null>(null)
  
  const device = useCameraDevice(cameraPosition)

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [hasPermission, requestPermission])

  const handleRequestPermission = useCallback(async () => {
    const permission = await requestPermission()
    if (!permission) {
      Alert.alert(
        "Camera Permission Required",
        "Please enable camera access in your device settings to use this feature.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      )
    }
  }, [requestPermission])

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition((prev) => (prev === "back" ? "front" : "back"))
  }, [])

  const toggleFlash = useCallback(() => {
    setFlash((prev) => (prev === "off" ? "on" : "off"))
  }, [])

  const takePhoto = useCallback(async () => {
    if (!camera.current) return
    
    try {
      setIsCapturing(true)
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: true,
      })
      setLastPhoto(photo)
      console.log("Photo taken:", photo.path)
      Alert.alert("Success", `Photo saved to: ${photo.path}`)
    } catch (error) {
      console.error("Error taking photo:", error)
      Alert.alert("Error", "Failed to take photo. Please try again.")
    } finally {
      setIsCapturing(false)
    }
  }, [flash])

  // Permission not yet requested
  if (hasPermission === null) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={themed($container)}
      >
        <View style={themed($centerContent)}>
          <ActivityIndicator size="large" color={theme.colors.tint} />
          <Text style={themed($messageText)} text="Loading camera..." />
        </View>
      </Screen>
    )
  }

  // Permission denied
  if (!hasPermission) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={themed($container)}
      >
        <View style={themed($centerContent)}>
          <Text preset="heading" style={themed($messageText)} text="Camera Access Required" />
          <Text
            style={themed($messageText)}
            text="This app needs camera permission to take photos."
          />
          <Button
            text="Grant Permission"
            onPress={handleRequestPermission}
            style={themed($button)}
          />
        </View>
      </Screen>
    )
  }

  // No camera device available
  if (!device) {
    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={themed($container)}
      >
        <View style={themed($centerContent)}>
          <Text preset="heading" style={themed($messageText)} text="No Camera Found" />
          <Text
            style={themed($messageText)}
            text="Unable to find a camera device on this device."
          />
        </View>
      </Screen>
    )
  }

  return (
    <Screen
      preset="fixed"
      safeAreaEdges={["top"]}
      contentContainerStyle={themed($container)}
    >
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      
      {/* Controls Overlay */}
      <View style={themed($controlsContainer)}>
        {/* Top Controls */}
        <View style={themed($topControls)}>
          
        </View>

        {/* Bottom Controls */}
        <View style={themed($bottomControls)}>
          {/* Flip Camera Button */}
          <TouchableOpacity
            style={themed($controlButton)}
            onPress={toggleCameraPosition}
          >
            <RefreshCcwDot color="white" size={48} />
          </TouchableOpacity>

          {/* Capture Button */}
          <TouchableOpacity
            style={themed($captureButton)}
            onPress={takePhoto}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <View style={themed($captureButtonInner)} />
            )}
          </TouchableOpacity>
            <TouchableOpacity
              style={themed($controlButton)}
              onPress={toggleFlash}
            >
              <Text style={themed($controlButtonText)}>
                {flash === "on" ? "⚡️" : "No ⚡️"}
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.background,
  flex: 1,
})

const $centerContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: spacing.lg,
})

const $messageText: ThemedStyle<TextStyle> = ({ spacing }) => ({
  textAlign: "center",
  marginVertical: spacing.sm,
})

const $button: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.lg,
})

const $controlsContainer: ThemedStyle<ViewStyle> = () => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "space-between",
})

const $topControls: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "flex-end",
  padding: spacing.lg,
})

const $bottomControls: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  paddingBottom: spacing.xl,
  paddingHorizontal: spacing.lg,
})

const $controlButton: ThemedStyle<ViewStyle> = ({ spacing, colors }) => ({
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  padding: spacing.md,
  borderRadius: 50,
  minWidth: 60,
  minHeight: 60,
  justifyContent: "center",
  alignItems: "center",
})

const $controlButtonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: "#fff",
  fontSize: 18,
  fontWeight: "600",
})

const $captureButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "rgba(255, 255, 255, 0.3)",
  borderWidth: 5,
  borderColor: "#fff",
  justifyContent: "center",
  alignItems: "center",
})

const $captureButtonInner: ThemedStyle<ViewStyle> = ({ colors }) => ({
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#fff",
})
