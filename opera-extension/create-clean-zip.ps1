# PowerShell script to create clean Opera Extension ZIP

Write-Host "Creating clean Opera Extension ZIP..." -ForegroundColor Green

# Navigate to parent directory
Set-Location ..

# Remove existing ZIP if it exists
if (Test-Path "temporary-email-opera-extension.zip") {
    Remove-Item "temporary-email-opera-extension.zip"
    Write-Host "Removed existing ZIP file" -ForegroundColor Yellow
}

# Create a temporary directory for clean files
$tempDir = "temp-opera-extension"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Name $tempDir | Out-Null

# Copy only the required files for Opera extension (excluding build scripts and docs)
$requiredFiles = @(
    "manifest.json",
    "popup.html", 
    "popup.css",
    "popup.js",
    "background.js",
    "content.js",
    "persona.ini",
    "icon16.png",
    "icon32.png",
    "icon48.png",
    "icon128.png",
    "logo.png"
)

# Copy required files
foreach ($file in $requiredFiles) {
    if (Test-Path "opera-extension\$file") {
        Copy-Item "opera-extension\$file" "$tempDir\$file"
        Write-Host "Copied: $file" -ForegroundColor Green
    }
}

# Create ZIP from clean directory
Compress-Archive -Path "$tempDir\*" -DestinationPath "temporary-email-opera-extension.zip"

# Clean up temporary directory
Remove-Item $tempDir -Recurse -Force

Write-Host "Clean ZIP file created successfully!" -ForegroundColor Green
Write-Host "File: temporary-email-opera-extension.zip" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://addons.opera.com/developer/" -ForegroundColor White
Write-Host "2. Sign in with your Opera account" -ForegroundColor White
Write-Host "3. Click Upload Extension" -ForegroundColor White
Write-Host "4. Select the temporary-email-opera-extension.zip file" -ForegroundColor White
Write-Host "5. Wait for processing and check for any errors" -ForegroundColor White
Write-Host ""
Write-Host "Extension ready for Opera upload!" -ForegroundColor Green 