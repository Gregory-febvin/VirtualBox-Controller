# Define variables MUST ABSOLUTELY IN FIRST
param(
    [string]$vmName,
    [string]$cloneName,
    [string]$clonePath
)

cd "C:\Program Files\Oracle\VirtualBox"

# Check if any of the variables are empty
if (-not $vmName -or -not $cloneName -or -not $clonePath) {
    Write-Host "Erreur : un ou plusieurs paramètres manquant(s)."
    exit
}

$cloneSucces = $false

try {
    # Clonnage de la machine virtuelle
    .\VBoxManage.exe clonevm "$vmName" --name "$cloneName" --register --basefolder "$clonePath"

    $cloneSucces = $true
} 
catch {
    Write-Host "Erreur : Impossible de cloner la machine virtuelle. $_" -ForegroundColor Red
}

if($cloneSucces){
    Write-Host "La machine virtuelle $VMName a été clonée avec succès." -ForegroundColor Green
}