# 🚀 ProjectC: Full-Stack Expo React Native App with Strapi CMS & PostgreSQL

[![Expo](https://img.shields.io/badge/Expo-52.x-blue?logo=expo)](https://docs.expo.dev/)
[![Strapi](https://img.shields.io/badge/Strapi-5.13.0-purple?logo=strapi)](https://strapi.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14.x-blue?logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready mobile application built with Expo (React Native) and Strapi Headless CMS, featuring dual authentication (vendor & employee), PostgreSQL database, and a modern, scalable architecture.

---

## 📱 Features

- **Vendor Login:** Email/password authentication for vendors (created by superadmin)
- **Employee Login:** OAuth authentication for employees (auto-creates user in Strapi on first login)
- **Custom OAuth Integration:** Strapi patched with `patch-package` for custom OAuth flows
- **Product & Order Management:** Robust data models for e-commerce scenarios
- **Modern UI:** Built with NativeWind (Tailwind CSS for React Native)
- **State Management:** Powered by Zustand
- **API:** REST & GraphQL endpoints via Strapi
- **PostgreSQL:** Reliable, scalable database backend

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Mobile App    │    │   Strapi CMS    │    │   PostgreSQL    │
│   (Expo RN)     │◄──►│   (Backend)     │◄──►│   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🚦 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/sharathpc/projectc
cd projectc
```

### 2. Configure Environment Variables

#### Strapi CMS (`cms/.env`):

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=yourpassword
DATABASE_SSL=false
APP_KEYS=your_app_key1,your_app_key2
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
JWT_SECRET=your_jwt_secret
```

#### Mobile App (`mobile/.env` or via Expo config):

```env
EXPO_PUBLIC_STRAPI_URL=http://localhost:1337
EXPO_PUBLIC_STRAPI_API_KEY=your_api_key_if_needed
```

---

### 3. Start the Backend (Strapi CMS)

```bash
cd cms
yarn install
yarn develop
```

- Configure your PostgreSQL connection in `cms/config/database.ts` or via environment variables above.

### 4. Start the Mobile App

```bash
cd ../mobile
yarn install
yarn start
```

- Use the Expo Go app or an emulator to preview the app.

---

## 🔐 Authentication Flows

### Vendor Login (Email/Password)

- Vendors are created by the superadmin in Strapi.
- Login via `/admin/login` endpoint.

### Employee Login (OAuth)

- Employees authenticate via OAuth.
- On first login, user info is inserted into Strapi automatically.
- Custom OAuth logic is enabled via patch-package in `cms/patches/`.

---

## 🛠️ Customization & Patches

- Strapi’s users-permissions plugin is patched for custom OAuth support.
- See `cms/patches/` for details.

---

## 📸 Demo

![Drive-Assist Demo](./screenshots/demo.gif)

---

## 📚 Documentation & Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Strapi Documentation](https://docs.strapi.io/)
- [React Native Documentation](https://reactnative.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

## 🚀 Deployment

### Deploying Strapi (Backend)

- You can deploy Strapi to services like Heroku, DigitalOcean, AWS, or Render.
- Set environment variables in your deployment platform for production.
- Make sure your PostgreSQL instance is accessible from your deployment environment.
- For production, set `DATABASE_SSL=true` and provide SSL certs if required.

### Deploying Mobile App

- Build your app with Expo Application Services (EAS) or Expo CLI:
  ```bash
  expo build:android
  expo build:ios
  # or with EAS
  eas build -p android
  eas build -p ios
  ```
- Update your API URLs in environment variables or Expo config for production endpoints.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

This project is licensed under the MIT License.
