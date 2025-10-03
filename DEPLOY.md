# 🚀 Guia de Deploy - CNA English Ranking

## 📋 Pré-requisitos

1. **Conta no Vercel** (gratuita)
2. **Banco de dados Neon** configurado
3. **Variáveis de ambiente** configuradas

## 🔧 Configuração

### 1. Variáveis de Ambiente

Configure as seguintes variáveis no Vercel:

```bash
DATABASE_URL=sua_url_do_neon_aqui
ADMIN_PASSWORD=sua_senha_segura_aqui
NODE_ENV=production
```

### 2. Deploy no Vercel

1. **Conecte seu repositório GitHub ao Vercel**
2. **Configure as variáveis de ambiente** no painel do Vercel
3. **Deploy automático** será feito

### 3. Executar Seed (Primeira vez)

Após o deploy, execute o seed para popular o banco:

```bash
# Via terminal do Vercel ou localmente
npm run db:seed
```

## 🔐 Segurança

- **Dashboard protegido**: Apenas com senha de admin
- **Ranking público**: Acessível a todos
- **Cookies seguros**: HttpOnly e SameSite
- **HTTPS**: Automático no Vercel

## 📱 URLs

- **Ranking Público**: `https://seu-dominio.vercel.app/`
- **Login Admin**: `https://seu-dominio.vercel.app/login`
- **Dashboard**: `https://seu-dominio.vercel.app/dashboard`

## 🎯 Compartilhamento

**Para os alunos**: Compartilhe apenas a URL do ranking público
**Para você**: Use a URL de login para acessar o dashboard

## 🔄 Atualizações

O sistema atualiza automaticamente quando você:
- Adiciona novos alunos
- Adiciona pontos
- Modifica dados

## 📞 Suporte

Em caso de problemas:
1. Verifique as variáveis de ambiente
2. Confirme se o banco está acessível
3. Verifique os logs no Vercel
