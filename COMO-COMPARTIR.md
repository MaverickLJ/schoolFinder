# 🚀 CÓMO COMPARTIR SCHOOLFINDER CON TUS COMPAÑEROS

## ✅ ¡Tu servidor está corriendo!

### 📱 URLs para compartir:

**Para ti (local - Live Server):**
```
http://127.0.0.1:5500/schoolFinder/busca-tu-escuela-landing/src/index.html
```

**Para tus compañeros (en la misma red WiFi):**
```
http://192.168.18.5:5500/schoolFinder/busca-tu-escuela-landing/src/index.html
```

### 📄 **Páginas disponibles:**
- **Página principal:** `/index.html` - Búsqueda de escuelas
- **Resultados avanzados:** `/result.html` - Comparaciones y rutas
- **Bienvenida:** `/welcome.html` - Página de inicio

### 🔧 **URLs alternativas (Puerto 8000):**
Si usas el servidor Python desde la carpeta correcta:
- Local: `http://localhost:8000/index.html`
- Red: `http://192.168.18.5:8000/index.html`

---

## 📋 Instrucciones para tus compañeros:

### 1. **Misma Red WiFi (Oficina/Casa)**
- Asegúrate de que estén conectados a la misma red WiFi que tú
- Compárteles este link: **http://192.168.18.5:8000**
- Pueden abrir la página en cualquier navegador (Chrome, Firefox, Safari, etc.)

### 2. **Si no pueden acceder:**
- Verifica que el Windows Firewall permita conexiones en puerto 8000
- Asegúrate de que tu antivirus no bloquee el servidor

---

## 🔧 Opciones Alternativas:

### A. **Ngrok (Acceso desde cualquier lugar)** ⭐ Recomendado
```bash
# 1. Descargar ngrok desde: https://ngrok.com/download
# 2. Ejecutar:
ngrok http 8000

# 3. Compartir la URL que aparece (ej: https://abc123.ngrok.io)
```

### B. **GitHub Pages (Permanente)** 
- Sube el código a GitHub
- Activa GitHub Pages
- URL permanente: https://maverickj.github.io/schoolFinder/

### C. **Netlify (Gratis y fácil)**
- Arrastra la carpeta `src` a netlify.com/drop
- Obtienes URL instantánea para compartir

---

## 🛑 Para detener el servidor:
- Presiona `Ctrl + C` en la terminal

## 🔄 Para reiniciar:
- Ejecuta el archivo `iniciar-servidor.bat`
- O usa el comando: `python -m http.server 8000`

---

## 📱 Prueba desde tu móvil:
Conecta tu teléfono a la misma WiFi y abre:
**http://192.168.18.5:8000**

¡Tu página debería funcionar perfectamente! 🎉
