# 🌐 ACCESO EXTERNO - COMPARTIR SCHOOLFINDER EN INTERNET

## 🚀 **Opción 1: Ngrok (Recomendado - Inmediato)**

### **Paso 1: Descargar Ngrok**
1. Ve a: https://ngrok.com/download
2. Descarga la versión para Windows
3. Extrae el archivo `ngrok.exe` en una carpeta fácil de encontrar

### **Paso 2: Configurar**
```powershell
# 1. Iniciar el servidor local (puerto 5500 o 8000)
cd "C:\Users\jesus.salazar\Desktop\Code\PrototipoSF\schoolFinder\busca-tu-escuela-landing\src"
python -m http.server 8000

# 2. En otra terminal, ejecutar ngrok
ngrok http 8000
```

### **Paso 3: Obtener URL pública**
Ngrok te dará una URL como: `https://abc123.ngrok.io`

**🎯 URL para compartir:** `https://abc123.ngrok.io/index.html`

---

## 🌟 **Opción 2: GitHub Pages (Gratis y Permanente)**

### **Paso 1: Subir a GitHub**
```powershell
git add .
git commit -m "Deploy SchoolFinder"
git push origin main
```

### **Paso 2: Activar GitHub Pages**
1. Ve a tu repositorio: https://github.com/MaverickLJ/schoolFinder
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main → /docs o /root
5. Save

**🎯 URL permanente:** `https://mavericklj.github.io/schoolFinder/busca-tu-escuela-landing/src/index.html`

---

## ⚡ **Opción 3: Netlify (Súper fácil)**

### **Método Drag & Drop:**
1. Ve a: https://netlify.com
2. Arrastra la carpeta `src` a la zona "Deploy"
3. Obtienes URL instantánea como: `https://amazing-site-123.netlify.app`

**🎯 URL para compartir:** `https://amazing-site-123.netlify.app/index.html`

---

## 🔧 **Opción 4: Vercel (Profesional)**

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
cd "C:\Users\jesus.salazar\Desktop\Code\PrototipoSF\schoolFinder\busca-tu-escuela-landing\src"
vercel --prod
```

---

## 📱 **¿Cuál elegir?**

- **Ngrok**: Para pruebas rápidas (4 horas gratis)
- **GitHub Pages**: Para uso permanente y profesional
- **Netlify**: Más fácil, arrastra y suelta
- **Vercel**: Más rápido y con mejor rendimiento

---

## 🎯 **Recomendación:**
1. **Inmediato**: Usa Ngrok para probar ahora
2. **Permanente**: Configura GitHub Pages para uso continuo

¡Tu SchoolFinder estará disponible en todo el mundo! 🌍
