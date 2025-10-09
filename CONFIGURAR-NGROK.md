# 🚀 CONFIGURACIÓN RÁPIDA DE NGROK

## 📋 **Estado actual:**
- ✅ Ngrok descargado e instalado
- ✅ Servidor local corriendo en puerto 8000
- ⚠️  Necesita autenticación (gratis)

## 🔧 **Pasos para completar:**

### **1. Crear cuenta gratuita (30 segundos):**
👉 **Ve a:** https://dashboard.ngrok.com/signup
- Regístrate con email (gratis, no tarjeta)
- Confirma email

### **2. Obtener token (automático):**
👉 **Ve a:** https://dashboard.ngrok.com/get-started/your-authtoken
- Copia tu token (aparece automáticamente)

### **3. Configurar token (1 comando):**
```powershell
.\ngrok.exe config add-authtoken TU_TOKEN_AQUI
```

### **4. Crear túnel público:**
```powershell
.\ngrok.exe http 8000
```

## 🎯 **Resultado:**
Obtendrás una URL como:
```
https://abc123-def456.ngrok-free.app
```

**URL para compartir:**
```
https://abc123-def456.ngrok-free.app/index.html
https://abc123-def456.ngrok-free.app/result.html
```

## ⚡ **Alternativa INMEDIATA sin registro:**
Si prefieres algo instantáneo, usa GitHub Pages:
👉 https://github.com/MaverickLJ/schoolFinder/settings/pages

¡Tu SchoolFinder estará online en 2 minutos! 🌍
