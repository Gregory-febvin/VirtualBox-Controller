function updateVMStatusColor(divVM, vmName) {
    verifyVMStatus(vmName)
        .then(state => {
            if (state.toLowerCase() === 'running') {
                divVM.style.backgroundColor = 'green'; //Allumé
            } else {
                divVM.style.backgroundColor = 'red'; //Eteint
            }
        })
        .catch(error => {
            console.error('Error updating VM status color:', error);
            divVM.style.backgroundColor = 'gray'; //Erreur
        });
}

// Fonction pour rafraîchir le tableau des machines virtuelles
function refreshVMList() {
    fetch('/vm-list')
        .then(response => response.json())
        .then(data => {
            let holder = document.getElementById('vm_list');
            holder.innerHTML = '';

            data.vms.forEach(vm => {

                let divVM = document.createElement("div");
                let divButton = document.createElement("div");

                divVM.textContent = vm;
                divVM.classList.add('vm-item');
                holder.appendChild(divVM);
                divVM.appendChild(divButton);

                //Cahnge couleur de la div en fonction de son status
                updateVMStatusColor(divVM, vm);

                const cloneButton = document.createElement('button');
                cloneButton.innerHTML = '<i class="fas fa-clone"></i> Cloner';
                cloneButton.onclick = function() {
                    document.getElementById('form_clone').style.display = 'block';
                    document.getElementById('cloneButton').addEventListener('click', function() {
                        const cloneName = document.getElementById('cloneNameInput').value;
                        const clonePath = document.getElementById('clonePathInput').value;
                        
                        fetch('/vm-clone?vmName=' + vm + '&cloneName=' + cloneName + '&clonePath=' + clonePath)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                            document.getElementById('form_clone').style.display = 'none';
                            refreshVMList();
                        });
                    });
                };
                divButton.appendChild(cloneButton);

                const cloneOVAButton = document.createElement('button');
                cloneOVAButton.innerHTML = '<i class="fas fa-clone"></i> Cloner (OVA)';
                cloneOVAButton.onclick = function() {
                    document.getElementById('form_clone').style.display = 'block';
                    document.getElementById('cloneOVAButton').addEventListener('click', function() {
                        const cloneName = document.getElementById('cloneNameInput').value;
                        const clonePath = document.getElementById('clonePathInput').value;
                        
                        fetch('/vm-clone_ova?vmName=' + vm + '&cloneName=' + cloneName + '&clonePath=' + clonePath)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                            document.getElementById('form_clone').style.display = 'none';
                            refreshVMList();
                        });
                    });
                };
                divButton.appendChild(cloneOVAButton);

                const startButtonNormal = document.createElement('button');
                startButtonNormal.innerHTML = '<i class="fas fa-play"></i> Démarrage Normal';
                startButtonNormal.onclick = function() {
                    fetch('/vm-start?vmName=' + vm)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                        });
                };
                divButton.appendChild(startButtonNormal);

                const startButtonNoDisplay = document.createElement('button');
                startButtonNoDisplay.innerHTML = '<i class="fas fa-tv"></i> Démarrage sans affichage';
                startButtonNoDisplay.onclick = function() {
                    fetch('/vm-start-noDisplay?vmName=' + vm)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                        });
                };
                divButton.appendChild(startButtonNoDisplay);

                const finishButton = document.createElement('button');
                finishButton.innerHTML = '<i class="fas fa-power-off"></i> Éteindre';
                finishButton.onclick = function() {
                    fetch('/vm-finish?vmName=' + vm)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                        });
                };
                divButton.appendChild(finishButton);

                const deleteButton = document.createElement('button');
                deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Supprimer';
                deleteButton.onclick = function() {
                    fetch('/vm-delete?vmName=' + vm)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            //alert(data.message);
                            refreshVMList();
                        });
                };
                divButton.appendChild(deleteButton);
            });
        })
        .catch(error => console.error('Error:', error));
}

function verifyVMStatus(vmName) {
    return fetch('/vm-status-vm?vmName=' + vmName)
        .then(response => response.json())
        .then(data => data.vms)
        .catch(error => {
            console.error('Error verifying VM status:', error);
            throw error;
        });
}

function verifyAllVMStatus() {
    fetch('/vm-status-all-vm')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.error('Error:', error));
}

// Appeler la fonction de rafraîchissement lorsque la page est chargée
window.onload = function() {
    refreshVMList();
};

document.getElementById('vm_create').addEventListener('click', function() {
    document.getElementById('form_create').style.display = 'block';
    document.getElementById('createButton').addEventListener('click', function() {
        const vmName = document.getElementById('createNameInput').value;
        const vmPath = document.getElementById('createPathInput').value;
        const osType = document.getElementById('createOsTypeInput').value;
        var isoPath = document.getElementById('createISOInput').value;
        const ramSize = document.getElementById('createRamSizeInput').value;
        const vramSize = document.getElementById('createVramSizeInput').value;
        const storageSize = document.getElementById('createStorageSizeInput').value;

        if(isoPath == ""){
            isoPath = "noISO"
        }
        
        fetch('/vm-create?vmName=' + vmName + '&vmPath=' + vmPath + '&osType=' + osType + 'ramSize=' + ramSize + '&vramSize=' + vramSize + '&storageSize=' + storageSize + '&isoPath=' + isoPath)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //alert(data.message);
            document.getElementById('form_create').style.display = 'none';
            refreshVMList();
        });
    });
});


document.getElementById('form_create').style.display = 'none';
document.getElementById('form_clone').style.display = 'none';