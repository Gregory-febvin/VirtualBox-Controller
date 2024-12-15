param(
    [string]$vmName
)

cd "C:\Program Files\Oracle\VirtualBox"

try {
    # Liste toutes les machines virtuelles
    $vmInfo = .\VBoxManage.exe showvminfo $vmName

    if ($vmInfo -match "State:\s+running") {
        $vmName
    }
}
catch {
    Write-Host "Erreur : Impossible de lister les machines virtuelles. $_" -ForegroundColor Red
}