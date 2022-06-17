#!/bin/bash

echo -e "How would you like to continue?\n[Download & Clean Install] downloads the ZIP file, configures Frontend & Backend HOST:PORT\n[Clean Install] uses the ZIP file in the folder, configures Frontend & Backend HOST:PORT\n[Update] just overwrites the updates while preserving the configuration files"

TARGET_DIR=""
        
if [ "$#" -eq "0" ]; then
    echo "ERROR: Enter a target directory for bwHC frontend installation"
    exit 1
else
    TARGET_DIR="$1"
fi

select option in "Download and Clean Install" "Clean Install" "Update" "Exit"; do
    case $option in
        "Download and Clean Install")
        sleep 1
        wget --no-check-certificate https://bwhealthcloud.de/downloads/latest/bwhc-frontend.zip;
        sleep 1
        
        if [ ! -d "$TARGET_DIR" ]; then
          mkdir -p "$TARGET_DIR"
        fi
        
        BWHC_APP_DIR="bwhc-frontend"  
        BWHC_ZIP="$BWHC_APP_DIR.zip"
        cp $BWHC_ZIP "$TARGET_DIR/"
        
        cd "$TARGET_DIR"
            if [ -d "$BWHC_APP_DIR" ]; then
            echo " Removing previous bwHC frontend app"
            rm -r $BWHC_APP_DIR
        fi
        
        unzip $BWHC_ZIP
        sleep 1
        read -p "enter Frontend Host IP [default: localhost]: " host
        bwhcFrontendIp="${host:-localhost}"
        sleep 1
        echo $bwhcFrontendIp
        sed -i '' "s/FEHOST/$bwhcFrontendIp/" bwhc-frontend/package.json
        sleep 1
        read -p "enter Frontend Host Port [default: 3000]: " port
        bwhcFrontendPort="${port:-3000}"
        sleep 1
        echo $bwhcFrontendPort
        sed -i '' "s/FEPORT/$bwhcFrontendPort/" bwhc-frontend/package.json
        sleep 1
        read -p "enter Backend Host IP [default: 127.0.0.1]: " host
        bwhcBackendIp="${host:-127.0.0.1}"
        sleep 1
        echo $bwhcBackendIp
        sed -i '' "s/BEHOST/$bwhcBackendIp/" bwhc-frontend/nuxt.config.js
        sleep 1
        read -p "enter Backend Host Port [default: 443]: " port
        bwhcBackendPort="${port:-443}"
        sleep 1
        echo $bwhcBackendPort
        sed -i '' "s/BEPORT/$bwhcBackendPort/" bwhc-frontend/nuxt.config.js
        sleep 1
        cd bwhc-frontend
        npm install
        sleep 3
        npm run generate     
        sleep 1
        echo "Congratulations bwHC Frontend Application is succesfully installed!"
        echo "Use 'npm start &' to run the frontend (in the background)."
        break;;
        
        "Clean Install")
        TARGET_DIR=""
        
        if [ ! -d "$TARGET_DIR" ]; then
          mkdir -p "$TARGET_DIR"
        fi
        
        BWHC_APP_DIR="bwhc-frontend"  
        BWHC_ZIP="$BWHC_APP_DIR.zip"
        cp $BWHC_ZIP "$TARGET_DIR/"
        
        cd "$TARGET_DIR"
            if [ -d "$BWHC_APP_DIR" ]; then
            echo " Removing previous bwHC frontend app"
            rm -r $BWHC_APP_DIR
        fi
        
        unzip $BWHC_ZIP
        sleep 1
        read -p "enter Frontend Host IP [default: localhost]: " host
        bwhcFrontendIp="${host:-localhost}"
        sleep 1
        echo $bwhcFrontendIp
        sed -i '' "s/FEHOST/$bwhcFrontendIp/" bwhc-frontend/package.json
        sleep 1
        read -p "enter Frontend Host Port [default: 3000]: " port
        bwhcFrontendPort="${port:-3000}"
        sleep 1
        echo $bwhcFrontendPort
        sed -i '' "s/FEPORT/$bwhcFrontendPort/" bwhc-frontend/package.json
        sleep 1
        read -p "enter Backend Host IP [default: 127.0.0.1]: " host
        bwhcBackendIp="${host:-127.0.0.1}"
        sleep 1
        echo $bwhcBackendIp
        sed -i '' "s/BEHOST/$bwhcBackendIp/" bwhc-frontend/nuxt.config.js
        sleep 1
        read -p "enter Backend Host Port [default: 443]: " port
        bwhcBackendPort="${port:-443}"
        sleep 1
        echo $bwhcBackendPort
        sed -i '' "s/BEPORT/$bwhcBackendPort/" bwhc-frontend/nuxt.config.js
        sleep 1
        cd bwhc-frontend
        npm install
        sleep 3
        npm run generate
        sleep 1
        echo "Congratulations bwHC Frontend Application is succesfully installed!"
        echo "Use 'npm start &' to run the frontend (in the background)."
        break;;
        
        "Update")
        BWHC_APP_DIR="bwhc-frontend"  
        BWHC_ZIP="$BWHC_APP_DIR.zip"
        
        FILES=(
            "nuxt.config.js"
            "package.json"
        )
        
        cp $BWHC_ZIP "$TARGET_DIR/"
        
        for FILE in "${FILES[@]}"; do

            if [ ! -f "$TARGET_DIR/$FILE" ]; then
            echo "Copying $FILE ..."
            cp $FILE "$TARGET_DIR/"
            fi
        done
        
        cd "$TARGET_DIR"
            if [ -d "$BWHC_APP_DIR" ]; then
            echo " Removing previous bwHC frontend app"
            rm -r $BWHC_APP_DIR
        fi
        
        unzip $BWHC_ZIP
        sleep 1                  
        cd bwhc-frontend
        npm install
        sleep 3
        npm run generate
        sleep 1
        echo "Congratulations bwHC Frontend Application is succesfully installed!"
        echo "Use 'npm start &' to run the frontend (in the background)." 
        break;;
        
        "Exit") exit;;
    esac
done