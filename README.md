# Cosmic Systems

Site de portfólio estático pronto para GitHub Pages.

Português (Brasil). Marca e contatos configuráveis em um único arquivo.

## Estrutura

```
site/
  brand.json     ← altere aqui para renomear a marca e o WhatsApp
  index.html     ← página única (hero, cases, o que construímos, como funciona, CTA)
  styles.css     ← estilos (cores podem ser sobrescritas por brand.json)
  script.js      ← carrega brand.json e preenche o conteúdo
.github/workflows/deploy.yml  ← workflow que publica no GitHub Pages
```

## Como renomear a marca (1 arquivo)

Edite `site/brand.json`:

```json
{
  "companyName": "Cosmic Systems",
  "tagline": "Sites e sistemas sob medida para pequenos negócios",
  "description": "Texto curto do hero",
  "whatsappE164": "55DDDSEUNUMERO",           // ex: "5511999999999"
  "whatsappMessage": "Mensagem padrão do WhatsApp",
  "heroCtaLabel": "Falar no WhatsApp",
  "demoCtaLabel": "Testar a demo",
  "primaryColor": "#6b46c1",
  "accentColor": "#22d3ee"
}
```

- **companyName/tagline/description**: usados no título e no hero.
- **whatsappE164**: número em formato E.164 (ex.: `5511999999999`).
- **whatsappMessage**: mensagem padrão do link do WhatsApp.
- **heroCtaLabel/demoCtaLabel**: textos dos botões.
- **primaryColor/accentColor**: ajusta as cores do tema.

## Casos em destaque

A seção “Casos” inclui:

- Sistema para escritório de advocacia — com demo interativa e credenciais visíveis, CTA “Testar a demo”.
- Cash Stack — `https://www.thecashstack.com`
- História Musical — `https://www.hmusical.com.br`
- Tupi Finance — `https://tupi-finance.vercel.app/`
- Impostor — `https://impostor-txup.onrender.com/`

## Publicação via GitHub Pages (Actions)

Este repositório já contém um workflow em `.github/workflows/deploy.yml` que publica o conteúdo da pasta `site/` no GitHub Pages.

Passos:

1. Garanta que o GitHub Actions está habilitado no repositório (Settings → Actions → General).
2. Em Settings → Pages, deixe “Build and deployment” como **GitHub Actions** (padrão para este workflow).
3. Ao fazer merge na branch `main`, o workflow será disparado automaticamente:
   - Ele faz upload do artefato da pasta `site/`
   - Em seguida, executa o deploy no Pages
4. O endereço do site aparece no ambiente “github-pages” do workflow e, por padrão, será:
   - `https://<seu-usuario>.github.io/<nome-do-repo>/`

## Pré-visualização local (opcional)

Qualquer servidor estático funciona. Exemplos:

```bash
# Node
npx serve site

# Python 3
python3 -m http.server -d site 5173
```

Abra o endereço informado pelo servidor (ex.: `http://localhost:5173`).

## Sucesso

- Workflow do Pages funcionando.
- Demo do escritório com credenciais claras e CTA “Testar a demo”.
- Renomear a marca editando apenas `site/brand.json`.

