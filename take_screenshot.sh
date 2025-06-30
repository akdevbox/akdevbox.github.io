#!/bin/bash
chromium --headless --screenshot --default-background-color=00000000 --window-size=1280,800 http://127.0.0.1:3434/logo.html
mv screenshot.png logo.png
chromium --headless --screenshot --default-background-color=00000000 --window-size=1280,800 http://127.0.0.1:3434/logo_white.html
mv screenshot.png logo_white.png
