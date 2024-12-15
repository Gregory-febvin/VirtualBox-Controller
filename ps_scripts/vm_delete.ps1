param(
    [string]$vmName
)

cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Arrêt de la machine virtuelle si elle est en cours d'execution
    .\VBoxManage.exe controlvm $vmName poweroff

    Write-Host "La machine virtuelle $vmName a été éteinte avec succès." -ForegroundColor Green
}
catch {
    Write-Host "Erreur : Impossible d'eteindre la machine virtuelle. $_" -ForegroundColor Red
}

try {
    # Suppression de la machine virtuelle et de tous ses disques
    .\VBoxManage.exe unregistervm $vmName --delete

    Write-Host "La machine virtuelle $vmName a été supprimée avec succès." -ForegroundColor Green
}
catch {
    Write-Host "Erreur : Impossible de supprimer la machine virtuelle. $_" -ForegroundColor Red
}