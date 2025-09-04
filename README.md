# DARK-NOVA-XMD

<img src="https://i.imgur.com/dBaSKWF.gif" height="90" width="100%">
𝐒𝐢𝐦𝐩𝐥𝐞 𝐁𝐞𝐬𝐭 𝐖𝐡𝐚𝐭𝐬𝐚𝐩𝐩 𝐁𝐨𝐭 𝐂𝐫𝐞𝐚𝐭𝐞𝐝 𝐁𝐲 DARK-NOVA-XMD 🌝💚
<div class = "repo" align = "center">
 
<a href = "#">
<img src = "https://github.com/dula9x/DARK-NOVA-XMD-V1-WEB-PAIR/blob/main/images/WhatsApp%20Image%202025-08-15%20at%2017.22.03_c520eb7b.jpg?raw=true"  width="300" height="200">
</img>
 <p align="center">
   
## 𝐃𝐄𝐏𝐋𝐎𝐘 𝐒𝐄𝐓𝐔𝐏 ↕
<a><img src='https://i.imgur.com/LyHic3i.gif'/>

🔑 Get Session ID (WhatsApp Pair Code Login)

> To deploy, generate your session ID from the link below:
<p align="left">
  <a href="https://malvin-pair-code-xzcb.onrender.com/?">
    <img src="https://img.shields.io/badge/%F0%9F%9A%80%20GET%20PAIR%20CODE%20WEB-ffcc00?style=for-the-badge"/>
  </a>
</p>
<a><img src='https://i.imgur.com/LyHic3i.gif'/>


<a><img src='https://i.imgur.com/LyHic3i.gif'/>

2. **Obtain the Session ID**: After accessing the URL, you should see a session ID displayed. Copy this session ID.

   1..DEPLOY ON GITHUB ⤵️


</details>

<b><strong><summary align="center" style="color: Yello;">Deploy On Workflow</summary></strong></b>
<p style="text-align: center; font-size: 1.2em;">
 
<h8>Copy the workflow codes and then frok the repo edit config add session id then save and now click on repo action tag then click on start new workflow then paste workflow codes rename main.yml to deploy.yml and save the file</h8>
<h3 align-"center"> Important</h3>
<h6 align-"center">Attention! We do not take responsibility if your github account is suspended through this Deploy method, I advise you not to use this workflow deploy method in the latest github accounts, github accounts created a year or more ago have not received the risk of suspension so far, this works It will only be done for 6 hours, you need to update the code to reactivate it.</h6>

```
name: Deploy DARK-NOVA-XMD

on:
  workflow_dispatch:
  push:
    branches: [ main ]
  schedule:
    - cron: '0 */6 * * *'  # Run every 6 hours

jobs:
  deploy:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: |
        npm install
        sudo apt-get update
        sudo apt-get install -y ffmpeg

    - name: Create sessions directory
      run: mkdir -p sessions

    - name: Create config.env from environment variables
      run: |
        echo "SESSION_ID=${{ secrets.SESSION_ID }}" > config.env
        echo "PREFIX=${{ secrets.PREFIX || '.' }}" >> config.env
        echo "MODE=${{ secrets.MODE || 'public' }}" >> config.env
        echo "OWNER_NUMBER=${{ secrets.OWNER_NUMBER }}" >> config.env
        echo "BOT_NAME=${{ secrets.BOT_NAME || 'DARK-NOVA-XMD' }}" >> config.env
        echo "ALWAYS_ONLINE=${{ secrets.ALWAYS_ONLINE || 'false' }}" >> config.env
        echo "AUTO_STATUS_SEEN=${{ secrets.AUTO_STATUS_SEEN || 'true' }}" >> config.env
        echo "AUTO_STATUS_REACT=${{ secrets.AUTO_STATUS_REACT || 'true' }}" >> config.env
        echo "ANTI_LINK=${{ secrets.ANTI_LINK || 'true' }}" >> config.env
        echo "ANTI_DEL=${{ secrets.ANTI_DEL || 'true' }}" >> config.env
        echo "WELCOME=${{ secrets.WELCOME || 'true' }}" >> config.env

    - name: Start application
      run: |
        npm start &
        sleep 30

```
