# Registro Fácil

App para professores registrarem o conteúdo de cada aula com foto da lousa ou texto, salvo no Google Drive ou OneDrive do próprio professor, organizado por turma, trimestre e data.

**Abrir o app:** https://alfero1968.github.io/registro-facil/

No celular, adicione à tela inicial para usar como aplicativo (Android: "Instalar app"; iPhone: Compartilhar › "Adicionar à Tela de Início").

- [GUIA.md](GUIA.md): o que foi construído, como testar e como ligar o Google Drive e o OneDrive, sem custo.
- `app.html`: o app inteiro. `node build.js` gera a versão publicada em `docs/`.
- `docs/`: arquivos publicados pelo GitHub Pages.

## Cartão digital NFC (Encontro de Networking)

**Abrir:** https://alfero1968.github.io/registro-facil/cartao/

Cada participante cria seu cartão (nome, posicionamento, WhatsApp, redes), e a página gera um link para gravar numa tag NFC (NTAG215) e um QR code. Os dados ficam no próprio link, sem servidor. No Chrome do Android dá para gravar a tag direto pela página; nos outros celulares, pelo app NFC Tools. O nome do evento fica na constante `EVENTO` em `docs/cartao/index.html`.
