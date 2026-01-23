# Configuración de Enlaces Profundos (Deep Links)

## 📋 Resumen
He creado la estructura necesaria para que los enlaces profundos funcionen correctamente con tu aplicación EquiGasto en **Android e iOS**.

## ✅ Cambios Realizados

1. **Creado** `src/.well-known/assetlinks.json` - Archivo de verificación de App Links (Android)
2. **Creado** `src/.well-known/apple-app-site-association` - Archivo de verificación de Universal Links (iOS)
3. **Actualizado** `angular.json` - Para copiar el directorio `.well-known` al build
4. **Actualizado** `netlify.toml` - Para servir correctamente ambos archivos con los headers adecuados

## 🔑 Paso Crítico: Obtener el SHA256 Fingerprint

Para que los enlaces profundos funcionen, **DEBES** reemplazar el valor `REEMPLAZA_CON_TU_SHA256_FINGERPRINT` en el archivo `src/.well-known/assetlinks.json` con el SHA256 fingerprint real de tu aplicación.

### Opción 1: Desde Play Console (Recomendado)

1. Ve a [Play Console](https://play.google.com/console/)
2. Selecciona tu aplicación **EquiGasto**
3. Ve a **Configuración** → **Integridad de la app**
4. En la sección **Certificados de firma de aplicaciones**, encontrarás el **SHA-256 certificate fingerprint**
5. Cópialo (tiene un formato como: `AA:BB:CC:DD:...`)
6. Elimina los dos puntos (`:`) para que quede como: `AABBCCDD...`

### Opción 2: Desde Android Studio / Keystore

Si tienes acceso al keystore de firma:

```bash
# Para el keystore de release
keytool -list -v -keystore tu-keystore.jks -alias tu-alias

# Para el keystore de debug (solo para pruebas)
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

Busca la línea que dice **SHA256:** y copia el valor (sin los dos puntos).

## 📝 Actualizar el archivo assetlinks.json

Edita `src/.well-known/assetlinks.json` y reemplaza:

```json
"sha256_cert_fingerprints": [
  "REEMPLAZA_CON_TU_SHA256_FINGERPRINT"
]
```

Por algo como:

```json
"sha256_cert_fingerprints": [
  "14:6D:E9:83:C5:73:06:50:D8:EE:B9:95:2F:34:FC:64:16:A0:83:42:E6:1D:BE:A8:8A:04:96:B2:3F:CF:44:E5"
]
```

**Nota:** Puedes tener múltiples fingerprints (útil si tienes certificados de debug y release).

## 🚀 Desplegar

Una vez que hayas actualizado ambos archivos (`assetlinks.json` y `apple-app-site-association`):

1. Haz commit de los cambios
2. Despliega en Netlify: `npm run build` (o git push si tienes CD configurado)
3. Verifica que los archivos son accesibles en:
   - **Android:** 
     - https://carajillolabs.com/.well-known/assetlinks.json
     - https://www.carajillolabs.com/.well-known/assetlinks.json
   - **iOS:** 
     - https://carajillolabs.com/.well-known/apple-app-site-association
     - https://www.carajillolabs.com/.well-known/apple-app-site-association

## 🧪 Verificar la Configuración

### Android
Usa la herramienta de Google para verificar tus App Links:
https://developers.google.com/digital-asset-links/tools/generator

O verifica manualmente:
```bash
curl https://carajillolabs.com/.well-known/assetlinks.json
```

### iOS
Verifica el archivo de Apple manualmente:
```bash
curl https://carajillolabs.com/.well-known/apple-app-site-association
```

O usa la herramienta de validación de Apple:
https://search.developer.apple.com/appsearch-validation-tool/

**Importante para iOS:**
- El archivo debe ser accesible por HTTPS
- El Content-Type debe ser `application/json`
- No debe tener extensión de archivo
- Apple cachea la verificación durante la instalación de la app

## 📱 Configuración en Android

Asegúrate de que tu aplicación Android (EquiGasto) tenga en el `AndroidManifest.xml`:

```xml
<activity android:name=".MainActivity">
    <intent-filter android:autoVerify="true">
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        
        <data
            android:scheme="https"
            android:host="carajillolabs.com"
            android:pathPrefix="/equigasto/join" />
        
        <data
            android:scheme="https"
            android:host="www.carajillolabs.com"
            android:pathPrefix="/equigasto/join" />
    </intent-filter>
</activity>
```

---

## 🍎 Configuración en iOS

### 🔑 Paso 1: Obtener tu Team ID

Para que los Universal Links funcionen en iOS, necesitas tu **Team ID** de Apple Developer:

1. Ve a [Apple Developer Account](https://developer.apple.com/account/)
2. Inicia sesión con tu cuenta de desarrollador
3. En la página principal, encontrarás tu **Team ID** (tiene un formato como: `ABC123XYZ`)
4. Copia este Team ID

### 📝 Paso 2: Actualizar apple-app-site-association

Edita `src/.well-known/apple-app-site-association` y reemplaza:

```json
"appIDs": [
  "REEMPLAZA_CON_TU_TEAM_ID.com.sire.equigasto"
]
```

Por algo como:

```json
"appIDs": [
  "ABC123XYZ.com.sire.equigasto"
]
```

**Nota importante:** 
- El formato es: `TEAM_ID.BUNDLE_ID`
- Asegúrate de que el Bundle ID coincida exactamente con el de tu app iOS
- También actualiza la sección `webcredentials` con el mismo formato

### 📱 Paso 3: Configurar Xcode

En tu proyecto de Xcode (EquiGasto):

1. **Añadir Associated Domains Capability:**
   - Selecciona tu target en Xcode
   - Ve a **Signing & Capabilities**
   - Haz clic en **+ Capability**
   - Añade **Associated Domains**

2. **Configurar los dominios:**
   - En Associated Domains, añade:
     - `applinks:carajillolabs.com`
     - `applinks:www.carajillolabs.com`

3. **Manejar Universal Links en código:**

**Swift (AppDelegate o SceneDelegate):**
```swift
func application(_ application: UIApplication,
                 continue userActivity: NSUserActivity,
                 restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
    
    guard userActivity.activityType == NSUserActivityTypeBrowsingWeb,
          let url = userActivity.webpageURL else {
        return false
    }
    
    // Parsear el URL
    // Ejemplo: https://carajillolabs.com/equigasto/join/ABC123
    if url.pathComponents.contains("equigasto") && url.pathComponents.contains("join") {
        if let groupId = url.pathComponents.last {
            // Navegar a la pantalla de join con el groupId
            print("Join group: \(groupId)")
            return true
        }
    }
    
    return false
}
```

**SwiftUI:**
```swift
.onOpenURL { url in
    // Manejar el URL aquí
    if url.pathComponents.contains("equigasto") && url.pathComponents.contains("join") {
        if let groupId = url.pathComponents.last {
            // Navegar a la pantalla de join
        }
    }
}
```

## ℹ️ Otras Aplicaciones

Si necesitas configurar enlaces profundos para tus otras aplicaciones (Ullr, EscapeRadar), deberás:

1. Añadir sus configuraciones al archivo `assetlinks.json`
2. Asegurarte de que sus `AndroidManifest.xml` también estén configurados correctamente

Ejemplo para múltiples apps:

```json
[
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.sire.equigasto",
      "sha256_cert_fingerprints": ["TU_SHA256_EQUIGASTO"]
    }
  },
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.carajillolabs.ullr",
      "sha256_cert_fingerprints": ["TU_SHA256_ULLR"]
    }
  },
  {
    "relation": ["delegate_permission/common.handle_all_urls"],
    "target": {
      "namespace": "android_app",
      "package_name": "com.carajillolabs.erl",
      "sha256_cert_fingerprints": ["TU_SHA256_ERL"]
    }
  }
]
```

## 🆘 Solución de Problemas

### Android: El enlace sigue sin funcionar después de desplegar

1. Espera 5-10 minutos (Google cachea las verificaciones)
2. Limpia los datos de Google Play Services en tu dispositivo:
   - Ajustes → Apps → Google Play Services → Almacenamiento → Borrar datos
3. Reinstala la app
4. Verifica que el archivo JSON sea válido (usa un validador JSON online)
5. Comprueba que el SHA256 fingerprint sea correcto

### Android: Error "No se han podido validar dominios"

- Asegúrate de que ambos dominios (con y sin www) sirvan el mismo archivo
- Verifica que el archivo sea accesible por HTTPS
- Comprueba que el `package_name` coincida exactamente con el de tu app
- Verifica que el `intent-filter` tenga `android:autoVerify="true"`

### iOS: Los Universal Links no funcionan

1. **Verifica el archivo:**
   - Debe ser accesible en: `https://carajillolabs.com/.well-known/apple-app-site-association`
   - Debe retornar Content-Type: `application/json`
   - Debe ser JSON válido (sin extensión de archivo)

2. **Verifica la configuración en Xcode:**
   - Associated Domains está añadido en Capabilities
   - Los dominios están en el formato: `applinks:carajillolabs.com` (sin https://)
   - El Team ID y Bundle ID son correctos

3. **Reinstala la app:**
   - Desinstala completamente la app del dispositivo
   - Apple verifica el archivo durante la instalación
   - Espera unos minutos después de reinstalar

4. **Prueba en Safari:**
   - Abre Safari en iOS
   - Navega a: `https://carajillolabs.com/equigasto/join/TEST123`
   - Mantén presionado el enlace
   - Si está bien configurado, verás la opción "Abrir en EquiGasto"

5. **Problemas comunes:**
   - El Universal Link no funciona si el usuario escribe el URL directamente en Safari
   - Debe venir desde otro lugar (Notes app, email, otra web, etc.)
   - No funciona en simulador de Xcode en algunas versiones

### iOS: "No se puede verificar el dominio"

- Asegúrate de que tu app esté firmada con el Team ID correcto
- Verifica que el dominio sea accesible públicamente
- El archivo debe estar en producción, no funcionará con localhost
- Apple puede tardar hasta 24 horas en cachear cambios

### Ambos: Probar en desarrollo

**Android:**
```bash
# Probar el intent desde adb
adb shell am start -W -a android.intent.action.VIEW -d "https://carajillolabs.com/equigasto/join/TEST123" com.sire.equigasto
```

**iOS:**
```bash
# Usar xcrun para probar Universal Links
xcrun simctl openurl booted "https://carajillolabs.com/equigasto/join/TEST123"
```

## 📚 Referencias

### Android
- [Android App Links](https://developer.android.com/training/app-links)
- [Digital Asset Links](https://developers.google.com/digital-asset-links)
- [Verificar App Links](https://developer.android.com/training/app-links/verify-android-applinks)

### iOS
- [Apple Universal Links](https://developer.apple.com/ios/universal-links/)
- [Supporting Associated Domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains)
- [Allowing Apps and Websites to Link to Your Content](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content)
- [Universal Links Validation Tool](https://search.developer.apple.com/appsearch-validation-tool/)
