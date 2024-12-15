# Define variables MUST ABSOLUTELY IN FIRST
param(
    [string]$vmName,
    [string]$vmPath,
    [string]$osType,
    [string]$ramSize,
    [string]$vramSize,
    [string]$storageSize,
    [string]$isoPath
)

cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Creation de la machine virtuelle
    .\VBoxManage.exe createvm --name $vmName --ostype $osType --register --basefolder $vmPath

    Write-Host "La machine virtuelle $vmName a été créée avec succès." -ForegroundColor Green
}
catch {
    Write-Host "Erreur : Impossible de créer la machine virtuelle. $_" -ForegroundColor Red
}

# Configuration de la machine virtuelle
.\"VBoxManage.exe" modifyvm $vmName --memory $ramSize --vram $vramSize
.\"VBoxManage.exe" createhd --filename "$vmPath\$vmName\$vmName.vdi" --size $storageSize
.\"VBoxManage.exe" storagectl $vmName --name "SATA Controller" --add sata --controller IntelAhci
.\"VBoxManage.exe" storageattach $vmName --storagectl "SATA Controller" --port 0 --device 0 --type hdd --medium "$vmPath\$vmName\$vmName.vdi"

# Ajouter un lecteur ISO si le chemin de l'ISO est fourni
if ($isoPath -ne "noISO") {
    if (Test-Path $isoPath) {
        .\"VBoxManage.exe" storagectl $vmName --name "IDE Controller" --add ide
        .\"VBoxManage.exe" storageattach $vmName --storagectl "IDE Controller" --port 0 --device 0 --type dvddrive --medium $isoPath
        Write-Host "L'ISO $isoPath a été attaché avec succès." -ForegroundColor Green
    } else {
        Write-Host "Erreur : Le chemin de l'ISO spécifié est invalide." -ForegroundColor Red
        Write-Host $isoPath
    }
} else {
    Write-Host "Aucun fichier ISO fourni, aucune image n'a été attachée." -ForegroundColor Yellow
}
