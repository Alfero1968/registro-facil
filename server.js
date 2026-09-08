// Servidor local simples para testar o app no computador: node server.js
// Abre http://localhost:8765 (o app) e também serve os arquivos do projeto em /app.html, /GUIA.md etc.
const http=require('http'),fs=require('fs'),path=require('path');
const root=__dirname;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.webmanifest':'application/manifest+json','.png':'image/png','.json':'application/json','.md':'text/markdown; charset=utf-8'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split('?')[0]); if(p==='/') p='/docs/index.html';
  const f=path.join(root,p); if(!f.startsWith(root)){res.writeHead(403);return res.end();}
  fs.readFile(f,(e,d)=>{ if(e){res.writeHead(404);return res.end('não encontrado');} res.writeHead(200,{'Content-Type':mime[path.extname(f)]||'application/octet-stream','Access-Control-Allow-Origin':'*'}); res.end(d); });
}).listen(8765,()=>console.log('Registro Fácil em http://localhost:8765'));
