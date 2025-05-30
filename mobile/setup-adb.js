// setup-adb.js
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Possible Android SDK locations
const possibleSdkPaths = [
    process.env.ANDROID_HOME,
    process.env.ANDROID_SDK_ROOT,
    path.join(process.env.LOCALAPPDATA || '', 'Android', 'Sdk'),
    path.join(process.env.USERPROFILE || '', 'AppData', 'Local', 'Android', 'Sdk'),
];

// Find the first valid path
let sdkPath = null;
for (const p of possibleSdkPaths) {
    if (p && fs.existsSync(p)) {
        sdkPath = p;
        break;
    }
}

if (!sdkPath) {
    console.error('Could not find Android SDK. Please set ANDROID_HOME environment variable.');
    process.exit(1);
}

// Path to adb
const adbPath = path.join(sdkPath, 'platform-tools', 'adb.exe');

// Check if adb exists
if (!fs.existsSync(adbPath)) {
    console.error(`ADB not found at ${adbPath}. Please ensure Android SDK Platform Tools are installed.`);
    process.exit(1);
}

// Run adb reverse command
try {
    console.log('Setting up port forwarding for Strapi (1337)...');
    execSync(`"${adbPath}" reverse tcp:1337 tcp:1337`, { stdio: 'inherit' });
    console.log('Port forwarding set up successfully!');
} catch (error) {
    console.error('Failed to set up port forwarding:', error.message);
    process.exit(1);
}
