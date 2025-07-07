# Script de lancement rapide

param(
    [switch]$SkipBackup,
    [switch]$TestOnly
)

Set-Location "C:\Users\diase\Downloads\Sarah-Jane-website\sarah-jane-iffra-website"

if ($TestOnly) {
    Write-Host "🧪 Mode Test uniquement" -ForegroundColor Yellow
    if (Get-Command "http-server" -ErrorAction SilentlyContinue) {
        http-server -p 9000 --cors
    } else {
        Write-Host "❌ http-server non installé. Exécutez: npm install -g http-server" -ForegroundColor Red
    }
} else {
    Write-Host "🚀 Lancement de l'optimisation complète..." -ForegroundColor Cyan
    & .\optimize-sarah-jane.ps1
}