# 🌐 SchoolFinder - Servidor Local (PowerShell)

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   🌐 SchoolFinder - Servidor Local" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Iniciando servidor web..." -ForegroundColor Green
Write-Host "Tu página estará disponible en:" -ForegroundColor White
Write-Host ""
Write-Host "💻 Local: http://localhost:8000" -ForegroundColor Magenta
Write-Host "🌍 Red:   http://192.168.18.5:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Comparte la URL de red con tus compañeros!" -ForegroundColor Yellow
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "c:\Users\jesus.salazar\Desktop\Code\PrototipoSF\schoolFinder\busca-tu-escuela-landing\src"

try {
    python -m http.server 8000
} catch {
    Write-Host "⚠️  Python no encontrado. Instalando servidor alternativo..." -ForegroundColor Yellow
    
    # Servidor alternativo con Node.js si está disponible
    if (Get-Command node -ErrorAction SilentlyContinue) {
        npx http-server -p 8000 -a 192.168.18.5
    } else {
        Write-Host "❌ Necesitas Python o Node.js para ejecutar el servidor" -ForegroundColor Red
        Write-Host "💡 Instala Python desde: https://python.org" -ForegroundColor Yellow
        pause
    }
}
