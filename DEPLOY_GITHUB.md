# 🚀 Deploy com GitHub - CNA English Ranking

## 📋 Passo a Passo Completo

### 1. 📁 Preparar o Projeto para GitHub

```bash
# No seu projeto
yarn build  # Testar se está tudo funcionando
```

### 2. 🔧 Configurar Variáveis de Ambiente

No seu arquivo `.env`, adicione:

```bash
# Suas variáveis existentes
DATABASE_URL=sua_url_do_neon

# NOVA - Senha para acessar o dashboard
ADMIN_PASSWORD=MinhaSenh@123!SuperSegura

# Para produção
NODE_ENV=production
```

### 3. 📦 Criar Repositório no GitHub

1. **Acesse**: [github.com](https://github.com)
2. **Clique em "New repository"**
3. **Nome**: `cna-english-ranking` (ou o que preferir)
4. **Descrição**: "Sistema de ranking gamificado para alunos de inglês"
5. **Público**: ✅ (para outros verem o código)
6. **NÃO marque**: "Add README" (você já tem arquivos)
7. **Clique "Create repository"**

### 4. 🔗 Conectar Projeto Local ao GitHub

```bash
# No seu projeto (terminal)
git init
git add .
git commit -m "Initial commit: CNA English Ranking System"

# Conectar ao repositório (substitua SEU_USUARIO pelo seu username)
git remote add origin https://github.com/SEU_USUARIO/cna-english-ranking.git
git branch -M main
git push -u origin main
```

**Nota**: O arquivo `.env` não será enviado para o GitHub (está no .gitignore)

### 5. 🚀 Deploy no Vercel

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Conecte com GitHub**
3. **Import Project** → Escolha seu repositório
4. **Configure as variáveis**:
   - `DATABASE_URL`: sua URL do Neon
   - `ADMIN_PASSWORD`: sua senha segura
   - `NODE_ENV`: production
5. **Deploy** automático!

### 6. 🌱 Executar Seed (Primeira vez)

```bash
# Via terminal local (com .env configurado)
yarn db:seed

# Ou via Vercel CLI
vercel env pull .env.local
yarn db:seed
```

### 7. 🎯 Testar o Sistema

1. **Ranking Público**: `https://seu-projeto.vercel.app/`
2. **Login Admin**: `https://seu-projeto.vercel.app/login`
3. **Dashboard**: `https://seu-projeto.vercel.app/dashboard`

## 📝 Personalizar o README

O README já está criado! Você só precisa personalizar:

1. **Substitua** `SEU_USUARIO` pelo seu username do GitHub
2. **Adicione** suas informações pessoais na seção "Autor"
3. **Ajuste** a descrição se quiser
4. **Adicione** screenshots se desejar

## 🎯 Próximos Passos

1. **Teste localmente**: `yarn build`
2. **Crie o repositório** no GitHub
3. **Faça o push** do código
4. **Deploy no Vercel**
5. **Configure as variáveis** de ambiente
6. **Execute o seed**: `yarn db:seed`
7. **Compartilhe** com os alunos!

## 🔗 URLs Finais

- **GitHub**: `https://github.com/SEU_USUARIO/cna-english-ranking`
- **Demo**: `https://seu-projeto.vercel.app/`
- **Admin**: `https://seu-projeto.vercel.app/login`
