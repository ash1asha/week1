$port = 8000
$folder = $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving HTTP on http://localhost:$port/ from $folder..."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $path = $request.Url.LocalPath
        if ($path -eq '/') { $path = '/index.html' }
        $localPath = Join-Path $folder $path.TrimStart('/')
        
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            if ($localPath.EndsWith('.html')) { $response.ContentType = 'text/html; charset=utf-8' }
            elseif ($localPath.EndsWith('.css')) { $response.ContentType = 'text/css' }
            elseif ($localPath.EndsWith('.js')) { $response.ContentType = 'application/javascript' }
            elseif ($localPath.EndsWith('.png')) { $response.ContentType = 'image/png' }
            elseif ($localPath.EndsWith('.jpg') -or $localPath.EndsWith('.jpeg')) { $response.ContentType = 'image/jpeg' }
            elseif ($localPath.EndsWith('.svg')) { $response.ContentType = 'image/svg+xml' }
            else { $response.ContentType = 'application/octet-stream' }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
