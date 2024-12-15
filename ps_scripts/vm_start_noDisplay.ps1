param(
    [string]$vmName
)

cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Demarrage de la machine virtuelle en mode sans affichage
    .\VBoxManage.exe startvm $vmName --type headless

    Write-Host "La machine virtuelle $vmName a demarré en mode sans affichage avec succès." -ForegroundColor Green
}
catch {
    Write-Host "Erreur : Impossible de demarrer la machine virtuelle en mode sans affichage. $_" -ForegroundColor Red
}