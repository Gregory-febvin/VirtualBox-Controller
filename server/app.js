const { exec } = require('child_process');

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

module.exports = {
    vm_list
};

// Définir le répertoire statique pour les fichiers publics
[ "public" ].forEach(dir => {
    app.use(express.static(path.join(__dirname, dir)));
} );
const psScriptsDir = path.join(__dirname, '../ps_scripts');

// Routes
app.get('/', (req, res) => {
    // Envoyer le fichier index.html situé dans le répertoire _layout
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/vm-list', (req, res) => {
    vm_list((vms) => {
        // Renvoyer les données en tant que JSON
        console.log(vms);
        res.json({ vms });
    });
});

app.get('/vm-status-vm', (req, res) => {
    const vmName = req.query.vmName;
    vm_status_vm(vmName, (vms) => {
        // Renvoyer les données en tant que JSON
        console.log(vms);
        res.json({ vms });
    });
});

app.get('/vm-status-all-vm', (req, res) => {
    vm_status_all_vm((vms) => {
        // Renvoyer les données en tant que JSON
        console.log(vms);
        res.json({ vms });
    });
});

app.get('/vm-clone', (req, res) => {
    const vmName    = req.query.vmName;
    const cloneName = req.query.cloneName;
    const clonePath = req.query.clonePath;
    vm_clone(vmName, cloneName, clonePath, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.get('/vm-create', (req, res) => {
    const vmName        = req.query.vmName;
    const vmPath        = req.query.vmPath;
    const osType        = req.query.osType;
    const ramSize       = req.query.ramSize;
    const vramSize      = req.query.vramSize;
    const storageSize   = req.query.storageSize;
    const isoPath       = req.query.isoPath;
    vm_create(vmName, vmPath, osType, ramSize, vramSize, storageSize, isoPath, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.get('/vm-delete', (req, res) => {
    const vmName = req.query.vmName;
    vm_delete(vmName, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.get('/vm-finish', (req, res) => {
    const vmName = req.query.vmName;
    vm_finish(vmName, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.get('/vm-start', (req, res) => {
    const vmName = req.query.vmName;
    vm_start(vmName, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.get('/vm-start-noDisplay', (req, res) => {
    const vmName = req.query.vmName;
    vm_start_noDisplay(vmName, (message) => {
        // Renvoyer les données en tant que JSON
        console.log(message);
        res.json({ message });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function vm_list(callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_list.ps1');
    const command = `powershell.exe -File ${powershellScriptPath}`;

    // Execute PowerShell script with variables
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${error}`);
            callback([]);
        } else {
            console.log('PowerShell script executed successfully.');

            const vms = stdout.trim().split('\r\n').map(vm => vm.split('"')[1]);

            callback(vms);
        }
    });
}

function vm_status_vm(vmName, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_status_vm.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName}`;

    // Execute PowerShell script with variables
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${error}`);
            callback([]);
        } else {
            console.log('PowerShell script executed successfully.');

            callback(stdout.replace(/[\r\n]/g, ''));
        }
    });
}

function vm_status_all_vm(callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_status_all_vm.ps1');
    const command = `powershell.exe -File ${powershellScriptPath}`;

    // Execute PowerShell script with variables
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${error}`);
            callback([]);
        } else {
            console.log('PowerShell script executed successfully.');

            const vms = stdout.trim().split('\r\n').map(vm => vm.split('"')[1]);

            callback(vms);
        }
    });
}

function vm_create(vmName, vmPath, osType, ramSize, vramSize, storageSize, isoPath, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_create.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName} -vmPath ${vmPath} -osType ${osType} -ramSize ${ramSize} -vramSize ${vramSize} -storageSize ${storageSize} -isoPath ${isoPath}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_delete(vmName, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_delete.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_start(vmName, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_start.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_finish(vmName, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_finish.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_start_noDisplay(vmName, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_start_noDisplay.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_clone(vmName, cloneName, clonePath, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_clone.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName} -cloneName ${cloneName} -clonePath ${clonePath}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function vm_clone_ova(vmName, cloneName, clonePath, callback) {
    // Define the PowerShell script path
    const powershellScriptPath = path.join(psScriptsDir, 'vm_clone_ova.ps1');
    const command = `powershell.exe -File ${powershellScriptPath} -vmName ${vmName} -cloneName ${cloneName} -clonePath ${clonePath}`;

    // Execute PowerShell script with variables
    executeCommand(callback, command);
}

function executeCommand(callback, command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing PowerShell script: ${error}`);
            callback(error);
        } else {
            console.log('PowerShell script executed successfully.');
            const output = stdout.split('\r\n')[0];
            console.log(output);
            callback(output);
        }
    });
}