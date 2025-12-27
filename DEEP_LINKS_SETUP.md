# Configuración de Enlaces Profundos (Deep Links)

## 📋 Resumen
He creado la estructura necesaria para que los enlaces profundos funcionen correctamente con tu aplicación EquiGasto.

## ✅ Cambios Realizados

1. **Creado** `src/.well-known/assetlinks.json` - Archivo de verificación de App Links
2. **Actualizado** `angular.json` - Para copiar el directorio `.well-known` al build
3. **Actualizado** `netlify.toml` - Para servir correctamente el archivo `assetlinks.json`

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

Una vez que hayas actualizado el archivo `assetlinks.json`:

1. Haz commit de los cambios
2. Despliega en Netlify: `npm run build` (o git push si tienes CD configurado)
3. Verifica que el archivo es accesible en:
   - https://carajillolabs.com/.well-known/assetlinks.json
   - https://www.carajillolabs.com/.well-known/assetlinks.json

## 🧪 Verificar la Configuración

Usa la herramienta de Google para verificar tus App Links:
https://developers.google.com/digital-asset-links/tools/generator

O verifica manualmente:
```bash
curl https://carajillolabs.com/.well-known/assetlinks.json
```

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

## ℹ️ Otras Aplicaciones

Si necesitas configurar enlaces profundos para tus otras aplicaciones (DojoTime, EscapeRadar), deberás:

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
      "package_name": "com.sire.dojotime",
      "sha256_cert_fingerprints": ["TU_SHA256_DOJOTIME"]
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

### El enlace sigue sin funcionar después de desplegar

1. Espera 5-10 minutos (Google cachea las verificaciones)
2. Limpia los datos de Google Play Services en tu dispositivo
3. Reinstala la app
4. Verifica que el archivo JSON sea válido (usa un validador JSON online)

### Error "No se han podido validar dominios"

- Asegúrate de que ambos dominios (con y sin www) sirvan el mismo archivo
- Verifica que el archivo sea accesible por HTTPS
- Comprueba que el `package_name` coincida exactamente con el de tu app

## 📚 Referencias

- [Android App Links](https://developer.android.com/training/app-links)
- [Digital Asset Links](https://developers.google.com/digital-asset-links)
- [Verificar App Links](https://developer.android.com/training/app-links/verify-android-applinks)

