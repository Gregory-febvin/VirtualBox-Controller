cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Liste toutes les machines virtuelles
    $vms = .\VBoxManage.exe list vms

    # Output VM names
    $vms
}
catch {
    Write-Host "Erreur : Impossible de lister les machines virtuelles. $_" -ForegroundColor Red
}