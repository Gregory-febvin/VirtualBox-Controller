param(
    [string]$vmName
)

cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Demarrage de la machine virtuelle
    .\VBoxManage.exe startvm $vmName

    Write-Host "La machine virtuelle $vmName a demarré avec succès." -ForegroundColor Green
}
catch {
    Write-Host "Erreur : Impossible de demarrer la machine virtuelle. $_" -ForegroundColor Red
}