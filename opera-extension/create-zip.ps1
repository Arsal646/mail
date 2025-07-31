# PowerShell script to create Opera Extension ZIP

Write-Host "Creating Opera Extension ZIP..." -ForegroundColor Green

# Navigate to parent directory
Set-Location ..

# Remove existing ZIP if it exists
if (Test-Path "temporary-email-opera-extension.zip") {
    Remove-Item "temporary-email-opera-extension.zip"
    Write-Host "Removed existing ZIP file" -ForegroundColor Yellow
}

# Create ZIP from opera-extension folder contents
Compress-Archive -Path "opera-extension\*" -DestinationPath "temporary-email-opera-extension.zip"

Write-Host "ZIP file created successfully!" -ForegroundColor Green
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