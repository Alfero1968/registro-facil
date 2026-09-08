// Gera docs/index.html (versão completa para GitHub Pages) a partir de app.html
const fs=require('fs');
const frag=fs.readFileSync('app.html','utf8');
const head=`<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#2E6B57">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Registro Fácil">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon-192.png">
<link rel="apple-touch-icon" href="icon-180.png">
</head>
<body>
`;
fs.mkdirSync('docs',{recursive:true});
fs.writeFileSync('docs/index.html',head+frag+'\n</body>\n</html>\n');
console.log('docs/index.html gerado:',fs.statSync('docs/index.html').size,'bytes');
