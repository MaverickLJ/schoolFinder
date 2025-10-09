# SchoolFinder - Buscador de Escuelas de Puerto Rico

Una aplicación web moderna para buscar y comparar escuelas en Puerto Rico con funcionalidades avanzadas de filtrado y navegación.

## 🌟 Características

- **Búsqueda Avanzada**: Filtra por municipio, tipo, modalidad, niveles educativos
- **Filtro por Distancia**: Encuentra escuelas cercanas a tu ubicación
- **Comparación de Escuelas**: Compara hasta múltiples escuelas lado a lado
- **Sistema de Navegación**: Obtén direcciones a cualquier escuela
- **Responsive Design**: Funciona perfectamente en móviles y desktop
- **Datos Reales**: Incluye información actualizada de escuelas de PR

## 🎯 Demo en Vivo

Puedes ver la aplicación funcionando en: [Tu URL aquí]

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5
- **Mapas**: Leaflet con OpenStreetMap
- **Iconos**: Bootstrap Icons
- **Responsive**: Mobile-first design

## 📱 Capturas de Pantalla

### Vista Principal
![Vista Principal](screenshots/main-view.png)

### Comparación de Escuelas
![Comparación](screenshots/comparison-modal.png)

### Sistema de Navegación
![Navegación](screenshots/directions-modal.png)

## 🚀 Cómo Usar

1. **Buscar Escuelas**: Usa los filtros en la barra lateral
2. **Ver Detalles**: Haz clic en "Ver Perfil" en cualquier escuela
3. **Comparar**: Guarda escuelas y usa el botón "Comparar"
4. **Obtener Direcciones**: Haz clic en "Cómo llegar"
5. **Filtrar por Distancia**: Ajusta el slider de distancia

## 💻 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/MaverickLJ/schoolFinder.git

# Navegar al directorio
cd schoolFinder/busca-tu-escuela-landing/src

# Abrir en navegador
open index.html
```

## 📂 Estructura del Proyecto

```
schoolFinder/
├── busca-tu-escuela-landing/
│   └── src/
│       ├── index.html          # Página principal
│       ├── result.html         # Resultados de búsqueda
│       ├── styles/
│       │   ├── main.css        # Estilos principales
│       │   └── result.css      # Estilos de resultados
│       ├── scripts/
│       │   ├── main.js         # JavaScript principal
│       │   └── simple.js       # Utilidades
│       └── images/
│           └── logo_SF.png     # Logo del proyecto
```

## 🎨 Características Técnicas

### Sistema de Filtros
- Filtro por municipio con dropdown interactivo
- Filtro por distancia con geolocalización
- Filtros por tipo de escuela (Público/Privado)
- Filtros por modalidad educativa

### Comparación de Escuelas
- Modal elegante con 3 pestañas (Overview, Academic, Details)
- Datos de rendimiento académico
- Información de servicios disponibles
- Diseño responsive para móviles

### Sistema de Navegación
- Integración con mapas Leaflet
- Cálculo de rutas en tiempo real
- Múltiples modos de transporte
- Trazado de rutas visual en el mapa

## 🔧 Configuración

### Variables de Entorno
No se requieren variables de entorno. La aplicación funciona completamente en el frontend.

### Datos de Escuelas
Los datos están embebidos en el JavaScript para demostración. En producción, estos vendrían de una API.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ve el archivo [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Tu Nombre** - *Desarrollador Principal* - [TuGitHub](https://github.com/tuusuario)

## 🙏 Reconocimientos

- Datos de escuelas de Puerto Rico
- Bootstrap por el framework CSS
- Leaflet por la funcionalidad de mapas
- Bootstrap Icons por los iconos

## 📞 Contacto

Si tienes preguntas o sugerencias, puedes contactarme:
- Email: tu-email@ejemplo.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)
- GitHub: [@tuusuario](https://github.com/tuusuario)

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!** ⭐
