@echo off
echo.
echo ========================================
echo   🌐 SchoolFinder - Servidor Local
echo ========================================
echo.
echo Iniciando servidor web...
echo Tu pagina estara disponible en:
echo.
echo 💻 Local: http://localhost:8000
echo 🌍 Red:   http://192.168.18.5:8000
echo.
echo Comparte la URL de red con tus compañeros!
echo.
echo Presiona Ctrl+C para detener el servidor
echo ========================================
echo.

cd /d "c:\Users\jesus.salazar\Desktop\Code\PrototipoSF\schoolFinder\busca-tu-escuela-landing\src"
python -m http.server 8000
