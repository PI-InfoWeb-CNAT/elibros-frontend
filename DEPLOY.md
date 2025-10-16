# Guia de Deploy - eLibros Frontend

## 📋 Pré-requisitos

Antes de fazer o deploy, certifique-se de ter:

1. **Node.js** (versão 18 ou superior)
2. **npm** ou **yarn**
3. **URL do Backend** configurada e funcionando

## 🔧 Configuração de Variáveis de Ambiente

### Para Deploy em Produção

1. Copie o arquivo `.env.example` para `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edite o arquivo `.env.local` e configure a URL do seu backend:
   ```bash
   NEXT_PUBLIC_API_URL=https://sua-api-backend.com/api/v1
   ```

   **Exemplos:**
   - Desenvolvimento local: `http://localhost:8000/api/v1`
   - Servidor de produção: `https://api.elibros.com/api/v1`
   - Heroku: `https://elibros-backend.herokuapp.com/api/v1`
   - Railway: `https://elibros-backend-production.up.railway.app/api/v1`

### Para Plataformas de Deploy (Vercel, Netlify, etc.)

Configure a variável de ambiente diretamente na plataforma:

**Vercel:**
```
Project Settings → Environment Variables
Nome: NEXT_PUBLIC_API_URL
Valor: https://sua-api-backend.com/api/v1
```

**Netlify:**
```
Site Settings → Build & Deploy → Environment
Nome: NEXT_PUBLIC_API_URL
Valor: https://sua-api-backend.com/api/v1
```

## 🚀 Build e Deploy

### 1. Instalar Dependências
```bash
npm install
```

### 2. Build para Produção
```bash
npm run build
```

### 3. Testar Localmente
```bash
npm start
```

O aplicativo estará disponível em `http://localhost:3000`

## 🐛 Resolução de Problemas

### Erro: "Failed to compile"

Se você encontrar erros de compilação relacionados a TypeScript ou ESLint:

1. **Verifique o arquivo `next.config.ts`:**
   - O arquivo está configurado para ignorar erros em produção
   - Em desenvolvimento, corrija os erros apontados

2. **Erros Comuns:**
   - `NEXT_PUBLIC_API_URL não definida`: Configure a variável de ambiente
   - Erros de tipo: Execute `npm run build` localmente para identificar
   - Erros de ESLint: Execute `npm run lint` para ver detalhes

### Erro de Conexão com Backend

Se o frontend não consegue se conectar ao backend:

1. **Verifique a URL da API:**
   ```bash
   echo $NEXT_PUBLIC_API_URL
   ```

2. **Teste a URL diretamente:**
   ```bash
   curl https://sua-api-backend.com/api/v1/livros/
   ```

3. **Configure CORS no Backend:**
   - Adicione o domínio do frontend na lista de origens permitidas
   - Exemplo Django: `CORS_ALLOWED_ORIGINS = ['https://seu-frontend.vercel.app']`

## 📦 Estrutura de Arquivos Importantes

```
elibros-frontend/
├── .env.example         # Template de variáveis de ambiente (commitar)
├── .env.local           # Variáveis locais (NÃO commitar)
├── next.config.ts       # Configurações do Next.js
├── src/
│   ├── config/
│   │   └── api.ts      # Configuração da URL base da API
│   └── services/        # Serviços de API
└── public/              # Arquivos estáticos
```

## 🔒 Segurança

### ⚠️ IMPORTANTE - Não Commitar:
- `.env.local` - Contém variáveis sensíveis
- `.env.production` - Variáveis de produção
- `.env.development` - Variáveis de desenvolvimento

### ✅ Pode Commitar:
- `.env.example` - Template sem valores sensíveis

## 📝 Checklist de Deploy

- [ ] Variável `NEXT_PUBLIC_API_URL` configurada
- [ ] Backend está online e acessível
- [ ] CORS configurado no backend
- [ ] `npm run build` executado com sucesso
- [ ] Testes locais funcionando (`npm start`)
- [ ] Variáveis de ambiente configuradas na plataforma de deploy
- [ ] Deploy realizado

## 🆘 Suporte

Em caso de problemas:

1. Verifique os logs do build
2. Teste localmente primeiro
3. Confirme que o backend está respondendo
4. Verifique as variáveis de ambiente

## 🎯 Deploy Rápido

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configure NEXT_PUBLIC_API_URL no painel da Vercel
```

### Netlify

```bash
# Build
npm run build

# Deploy (usando Netlify CLI)
netlify deploy --prod --dir=.next
```

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NEXT_PUBLIC_API_URL=https://sua-api.com/api/v1

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build e Run
docker build -t elibros-frontend .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://sua-api.com/api/v1 elibros-frontend
```

## 📊 Monitoramento

Após o deploy, monitore:

- Status de resposta da API
- Tempo de carregamento das páginas
- Erros no console do navegador
- Logs do servidor Next.js

---

**Última atualização:** Outubro 2025
