# Allerra

*A smart allergen detection app powered by computer vision.*

## Overview

**Allerra** is a **React Native** app that helps users identify potential allergens in their meals using **image recognition**.
By taking a photo of their food, users can instantly see if it may contain allergens based on their personal allergen profile.

This app is built with the **Ignite** boilerplate and powered by a **custom-trained Convolutional Neural Network (CNN)** for food classification and allergen detection.

---

## Features

* **Photo-Based Detection** – Snap a picture of your food and let the AI analyze it.
* **Custom CNN Model** – Uses a deep learning model trained on allergen-specific food datasets.
* **Personal Allergen Profiles** – Users can input and manage their own allergen lists (e.g. nuts, dairy, eggs).
* **Instant Risk Alerts** – Warns if the detected food may contain allergens.
* **Ignite Boilerplate** – Built on [Ignite](https://github.com/infinitered/ignite) for a scalable, well-structured React Native foundation.

---

## 🛠️ Tech Stack

| Layer                         | Technology                                   |
| ----------------------------- | -------------------------------------------- |
| **Frontend**                  | React Native (with Ignite)                   |
| **AI Model**                  | Custom-trained CNN (TensorFlow / PyTorch)    |
| **Backend**                   | Node.js / Firebase (for data sync & storage) |
| **Camera & Image Processing** | Expo Camera / Vision API                     |
| **State Management**          | MobX-State-Tree (from Ignite)                |

---

## 🧩 Project Structure

```
allerra/
├── app/
│   ├── components/
│   ├── models/
│   ├── screens/
│   ├── services/
│   ├── utils/
│   └── App.tsx
├── ignite/
│   └── boilerplate/
├── assets/
│   └── images/
├── package.json
└── README.md
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/allerra.git
   cd allerra
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run on device or emulator**

   ```bash
   npx expo start
   ```

   or

   ```bash
   npm run android
   # or
   npm run ios
   ```

---

## 🧠 Model Integration

The CNN model is trained separately and exported as a **TensorFlow Lite (TFLite)**  model for mobile inference.

---

## 🔮 Future Roadmap

* ☁️ Cloud model updates for improved accuracy
* 🍴 Integration with restaurant menus / barcode scanning
* 💬 Community dataset contributions

---



<!-- ## Getting Started

```bash
npm install --legacy-peer-deps
npm run start
```

To make things work on your local simulator, or on your phone, you need first to [run `eas build`](https://github.com/infinitered/ignite/blob/master/docs/expo/EAS.md). We have many shortcuts on `package.json` to make it easier:

```bash
npm run build:ios:sim # build for ios simulator
npm run build:ios:device # build for ios device
npm run build:ios:prod # build for ios device
```

### `./assets` directory

This directory is designed to organize and store various assets, making it easy for you to manage and use them in your application. The assets are further categorized into subdirectories, including `icons` and `images`:

```tree
assets
├── icons
└── images
```

**icons**
This is where your icon assets will live. These icons can be used for buttons, navigation elements, or any other UI components. The recommended format for icons is PNG, but other formats can be used as well.

Ignite comes with a built-in `Icon` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/boilerplate/app/components/Icon.md).

**images**
This is where your images will live, such as background images, logos, or any other graphics. You can use various formats such as PNG, JPEG, or GIF for your images.

Another valuable built-in component within Ignite is the `AutoImage` component. You can find detailed usage instructions in the [docs](https://github.com/infinitered/ignite/blob/master/docs/Components-AutoImage.md).

How to use your `icon` or `image` assets:

```typescript
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <Image source={require('assets/images/my_image.png')} />
  );
};
```

## Running Maestro end-to-end tests

Follow our [Maestro Setup](https://ignitecookbook.com/docs/recipes/MaestroSetup) recipe.

## Next Steps

### Ignite Cookbook

[Ignite Cookbook](https://ignitecookbook.com/) is an easy way for developers to browse and share code snippets (or “recipes”) that actually work.

### Upgrade Ignite boilerplate

Read our [Upgrade Guide](https://ignitecookbook.com/docs/recipes/UpdatingIgnite) to learn how to upgrade your Ignite project.

## Community

⭐️ Help us out by [starring on GitHub](https://github.com/infinitered/ignite), filing bug reports in [issues](https://github.com/infinitered/ignite/issues) or [ask questions](https://github.com/infinitered/ignite/discussions).

💬 Join us on [Slack](https://join.slack.com/t/infiniteredcommunity/shared_invite/zt-1f137np4h-zPTq_CbaRFUOR_glUFs2UA) to discuss.

📰 Make our Editor-in-chief happy by [reading the React Native Newsletter](https://reactnativenewsletter.com/). -->
