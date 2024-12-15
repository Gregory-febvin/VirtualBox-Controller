param(
    [string]$vmName,
    [string]$cloneName,
    [string]$clonePath    
)

cd "C:\Program Files\Oracle\VirtualBox"

if (-not $vmName -or -not $cloneName -or -not $clonePath) {
    Write-Host "Erreur : Tous les paramètres doivent être fournis." -ForegroundColor Red
    exit
}

$cloneSucces = $false

try {
    $tempOVAPath = "$env:USERPROFILE\VirtualBox\$vmName.ova"
    $tempClonePath = "$env:USERPROFILE\VirtualBox"

    .\VBoxManage.exe export "$vmName" --output "$tempOVAPath"

    .\VBoxManage.exe import "$tempOVAPath" --vsys 0 --vmname "$cloneName" --basefolder "$tempClonePath"

    Remove-Item -Path $tempOVAPath -Force

    $cloneSucces = $true
}
catch {
    Write-Host "Erreur : $_" -ForegroundColor Red
}

if($cloneSucces){
    Write-Host "La machine virtuelle $VMName a été clonée avec succès." -ForegroundColor Green
}