# Registro Fácil — guia do mentor

Este guia é para quem não programa. Ele explica o que foi construído, como testar agora e o que você precisa fazer (sem gastar nada) para os professores usarem o app com o OneDrive ou o Google Drive.

## 1. O que foi construído

O Registro Fácil é um **app web instalável** (PWA). O professor abre um link no celular, toca em "Adicionar à tela inicial" e o app passa a ter ícone e abrir em tela cheia, como um app da loja. Funciona em Android e iPhone, e não precisa de loja nem de conta de desenvolvedor.

Tudo o que foi combinado na conversa está implementado:

| Combinado | Como ficou no app |
|---|---|
| Cadastro de nome, disciplina, turmas e horário semanal | Assistente de 5 passos no primeiro acesso; tudo editável em Ajustes |
| Datas de início e fim dos 3 trimestres | Passo 4 do cadastro, com validação (sem sobreposição, início antes do fim) |
| Identificar a turma pelo horário | A tela principal mostra "Aula de agora" e permite trocar com um toque |
| Corrigir turma e data antes de salvar | Botão "Outra turma ou data" |
| Texto e/ou fotos da lousa ou do livro | Campo de texto e botão "Tirar foto" (câmera traseira), várias fotos por registro |
| Fotos reduzidas para não ocupar espaço | Redução para no máximo 1600 px, JPEG, antes do envio |
| Estrutura de pastas | `Registro Fácil / 7º B / 2º Trimestre / 2026-06-15 / arquivos` |
| Dois registros da mesma turma no mesmo dia | Nomes diferentes: `aula-07h50-xxxx-foto-01.jpg`, `aula-10h00-yyyy-conteudo.txt` |
| Sem cópia permanente no celular | Fotos ficam no aparelho só até a confirmação da nuvem, depois são apagadas |
| Funcionar sem internet | Registro fica "Aguardando internet" e é enviado sozinho quando a conexão volta |
| Confirmação clara de envio | Etiquetas: Aguardando envio · Enviando · Salvo na nuvem · Falha no envio |
| Repetir envio sem duplicar | O mesmo registro sempre grava com o mesmo nome de arquivo (substitui, não duplica) |
| Consulta por turma e data | Aba Histórico, com filtro por turma e link "Abrir pasta" na nuvem |
| Excluir com confirmação | Sim, e avisa que os arquivos já enviados continuam na nuvem |
| Preparado para a IA ler depois | Cada aula gera também um `…-registro.json` com todos os campos |
| Google Drive **e** OneDrive | Google Drive como caminho principal (conta particular, sem depender do TI); OneDrive da escola disponível assim que o TI aprovar |
| Sem custo | Hospedagem no GitHub Pages (grátis), arquivos na conta do próprio professor |

Conteúdo do arquivo de texto gerado em cada aula:

```
REGISTRO DE AULA — Registro Fácil
Professor(a): Ana Exemplo
Disciplina: Matemática
Turma: 7º B
Data da aula: 07/09/2026 (segunda-feira)
Horário: 07:50 às 08:40
Trimestre: 3º Trimestre

CONTEÚDO TRABALHADO
Frações equivalentes — simplificação e comparação. Exercícios 3 a 8 da p. 42.

Fotos: aula-07h50-k3f2-foto-01.jpg
Registro criado em: 07/09/2026 08:35
Identificador: 1a2b3k3f2
```

## 2. Arquivos do projeto

| Arquivo | Para que serve |
|---|---|
| `app.html` | O app inteiro (telas, regras, conexão com nuvem). É o único arquivo que se edita. |
| `docs/` | Pasta pronta para publicar no GitHub Pages: `index.html`, ícones, manifesto e cache offline. |
| `build.js` | Gera `docs/index.html` a partir de `app.html`. Rode `node build.js` depois de qualquer mudança. |
| `server.js` | Abre o app no computador para testes: `node server.js` e acesse http://localhost:8765 |
| `GUIA.md` | Este guia. |

## 3. Testar agora, sem configurar nada

O app tem um **modo demonstração**: o fluxo inteiro funciona, mas nada é enviado para a nuvem (os registros ficam só no aparelho). No primeiro passo do cadastro há o botão "Preencher com dados de exemplo", que cria três turmas, um horário e os trimestres do ano.

Use esse modo para mostrar o app aos professores e colher opiniões sobre as telas antes de configurar as contas.

## 4. Publicar de graça (GitHub Pages)

O app precisa ficar em um endereço `https://` para a câmera e o login funcionarem. O GitHub Pages faz isso sem custo.

1. Crie uma conta em github.com (se ainda não tiver).
2. Clique em **New repository**, nome `registro-facil`, público, e crie.
3. Na página do repositório, use **Add file › Upload files** e envie a pasta `docs` inteira (arraste a pasta).
4. Em **Settings › Pages**, em "Build and deployment", escolha *Deploy from a branch*, branch `main`, pasta `/docs`. Salve.
5. Em um ou dois minutos o app estará em `https://SEU-USUARIO.github.io/registro-facil/`.

Esse é o link que os professores abrem no celular. No Android, o Chrome oferece "Instalar app"; no iPhone, Safari › Compartilhar › "Adicionar à Tela de Início".

Para atualizar o app depois: edite `app.html`, rode `node build.js`, envie novamente a pasta `docs` e mude o número em `docs/sw.js` (`registro-facil-v1` → `v2`) para os celulares pegarem a versão nova.

## 5. Ligar o Google Drive (caminho principal)

Decisão do projeto: o Google Drive é o caminho principal, porque cada professor tem conta particular e nada depende do TI da escola. Você registra o app **uma vez**, na sua conta Google, sem custo. Depois cada professor só faz login na própria conta.

1. Entre em https://console.cloud.google.com com sua conta Google. Aceite os termos na primeira vez.
2. No alto da tela, clique no seletor de projeto › **Novo projeto**. Nome: `Registro Facil`. Criar e selecionar o projeto.
3. Menu ☰ › **APIs e serviços › Biblioteca**. Procure **Google Drive API** e clique em **Ativar**.
4. Menu ☰ › **APIs e serviços › Tela de permissão OAuth** (pode aparecer como *Google Auth Platform › Branding*). Preencha:
   - Nome do app: `Registro Fácil`
   - E-mail de suporte: o seu
   - Público (tipo de usuário): **Externo**
   - Contato do desenvolvedor: o seu e-mail
5. Ainda na tela de permissão, em **Público** (ou *Usuários de teste*), adicione o e-mail Google de cada professor que participará do teste. Enquanto o app estiver "Em teste", só esses e-mails conseguem conectar (limite: 100).
6. Menu ☰ › **APIs e serviços › Credenciais › Criar credenciais › ID do cliente OAuth**.
   - Tipo de aplicativo: **Aplicativo da Web**
   - Nome: `Registro Fácil web`
   - **Origens JavaScript autorizadas**: `https://SEU-USUARIO.github.io` (só o domínio, sem `/registro-facil`)
   - Não precisa preencher "URIs de redirecionamento".
   - Criar. Copie o **ID do cliente** (termina em `.apps.googleusercontent.com`).
7. Abra `app.html`, encontre no início do script o bloco `ADMIN` e cole o ID em `GOOGLE_CLIENT_ID`. Rode `node build.js` e envie a pasta `docs` de novo ao GitHub.

Para testar antes de publicar: qualquer professor pode colar o ID em **Ajustes › Avançado** dentro do app, sem mexer em código.

O que o professor vê ao conectar: a tela padrão do Google pedindo permissão para "Ver, editar, criar e excluir apenas os arquivos do Google Drive que você usa com este app". É o escopo mais restrito que existe; o app não enxerga os outros arquivos da conta. Enquanto o app estiver "Em teste", o Google mostra um aviso de "app não verificado"; o professor toca em *Continuar*. Se quiser tirar esse aviso mais tarde, clique em **Publicar app** na tela de permissão. Como o escopo não é sensível, não há verificação nem cobrança.

## 6. Ligar o OneDrive da escola (quando o TI aprovar)

O app já está pronto para o OneDrive. Ele só passa a funcionar quando dois passos acontecerem: você registrar o app na Microsoft (grátis, na sua conta) e a gestora de TI da escola aprovar as permissões.

**Passo A: registrar o app (você, uma vez)**

1. Entre em https://portal.azure.com com uma conta Microsoft (pode ser pessoal). Procure **Registros de aplicativo** › **Novo registro**.
2. Nome: `Registro Fácil`. Tipos de conta: **"Contas em qualquer diretório organizacional e contas pessoais da Microsoft"**.
3. URI de redirecionamento: tipo **Aplicativo de página única (SPA)**, valor `https://SEU-USUARIO.github.io/registro-facil/` (com a barra final). Registrar.
4. Copie o **ID do aplicativo (cliente)** da visão geral.
5. **Permissões de API › Adicionar permissão › Microsoft Graph › Permissões delegadas**: marque `Files.ReadWrite` e `User.Read`.
6. Cole o ID em `MICROSOFT_CLIENT_ID` no bloco `ADMIN` de `app.html`, rode `node build.js` e publique.

**Passo B: pedido para a gestora de TI (texto pronto)**

> Assunto: Autorização de app para registro de aulas no OneDrive
>
> Prezada [nome],
>
> Estou conduzindo uma mentoria com professores da escola para reduzir o tempo gasto com registros de aula. Desenvolvemos um aplicativo chamado **Registro Fácil**, que salva fotos da lousa e anotações do professor na pasta "Registro Fácil" do OneDrive do próprio professor, organizadas por turma, trimestre e data.
>
> O aplicativo não tem servidor próprio e não copia dados para fora da conta do professor. Ele precisa apenas de duas permissões delegadas do Microsoft Graph, que valem só para a conta de quem fizer login:
>
> - `Files.ReadWrite` (criar e ler arquivos no OneDrive do usuário)
> - `User.Read` (identificar o usuário conectado)
>
> Peço que conceda o consentimento de administrador para este aplicativo:
>
> - Nome: Registro Fácil
> - ID do aplicativo (cliente): [colar o ID do passo A]
>
> Isso pode ser feito em Microsoft Entra › Aplicativos empresariais › Consentimento e permissões, ou abrindo o link de consentimento que posso enviar. Fico à disposição para uma conversa rápida.
>
> Atenciosamente, [seu nome]

Link de consentimento que você pode enviar junto (troque `ID-DO-APP` pelo ID do passo A):

```
https://login.microsoftonline.com/common/adminconsent?client_id=ID-DO-APP
```

Enquanto a aprovação não sai, o app mostra uma mensagem orientando o professor a usar o Google Drive.

## 7. Limites que precisam ficar claros

- **Sem servidor próprio.** O app não guarda nada fora do celular e da conta do professor. Se o professor trocar de celular, os registros continuam na nuvem, mas o cadastro (turmas, horário) precisa ser refeito.
- **Fotos maiores que 4 MB** não são enviadas ao OneDrive pelo método usado. Com a redução automática, uma foto de lousa fica em torno de 200 a 500 KB, bem abaixo do limite.
- **Google Drive pede novo login a cada 1 hora** de uso ativo, por regra do próprio Google para apps sem servidor. O app avisa e refaz o login com um toque; os registros pendentes não se perdem.
- **Uma escola e um ano letivo** por professor, como combinado para o primeiro teste. No ano seguinte, definiremos como separar os anos (a sugestão continua sendo o nome da pasta de turma com o ano).
- **A foto documenta, mas não comprova sozinha.** A aceitação como registro oficial precisa ser combinada com a coordenação.
- **Evite alunos nas fotos.** Fotografe a lousa ou o livro, não a sala.

## 8. Próximas etapas (fora desta versão)

1. **IA para ler as fotos e sugerir o texto do diário**, sempre com revisão do professor. O arquivo `…-registro.json` já foi pensado para isso.
2. **Preenchimento do diário no TOTVS.** Precisamos do nome exato do produto (por exemplo, TOTVS Educacional / RM Classis / Portal do Professor), de uma tela de exemplo do diário e da política da escola sobre integrações. A ordem de preferência segue a combinada: integração oficial, importação de arquivo, e só por último automação da tela.
3. **Várias escolas e anos letivos** no mesmo app.

## 9. Roteiro para o teste com 3 a 5 professores

1. Envie o link do app e peça para instalar na tela inicial.
2. Peça que façam o cadastro completo (10 minutos) e conectem a nuvem.
3. Durante uma semana, registrem todas as aulas pelo app.
4. Ao fim da semana, confira com cada um: a turma sugerida estava certa? Faltou internet em algum momento e o envio aconteceu depois? Encontraram a pasta na nuvem? Quanto tempo levaram por aula?
5. Anote o que pediram de diferente. Ajustamos o app e partimos para a etapa da IA.
