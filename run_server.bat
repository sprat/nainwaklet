@echo off
pushd "%~dp0"
start "Web Server" python.exe -m SimpleHTTPServer 8080
popd
