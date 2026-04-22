# Kanban UI

Frontend do sistema Kanban SaaS desenvolvido com Angular 21, Angular Material e TailwindCSS.

## 🚀 Tecnologias

- **Angular 21** — Standalone Components
- **Angular Material** — Componentes de UI
- **TailwindCSS 3** — Estilização utilitária
- **Angular CDK** — Drag & Drop
- **RxJS** — Programação reativa
- **TypeScript** — Tipagem estática

---

## 📋 Funcionalidades

- ✅ Login e cadastro com JWT
- ✅ Refresh token automático
- ✅ Listagem de boards
- ✅ Criar e deletar boards
- ✅ Board Kanban completo
- ✅ Criar e deletar colunas
- ✅ Criar e deletar tarefas
- ✅ Drag & drop entre colunas
- ✅ Isolamento multi-tenant
- ✅ Guard de rotas autenticadas
- ✅ Interceptor JWT automático

---

## ⚙️ Pré-requisitos

- Node.js 20+
- Angular CLI 21+
- Backend kanban-api rodando em localhost:8080

---

## 🐳 Rodando o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/marcofavero3/kanban-ui.git
cd kanban-ui
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Suba o backend primeiro

Certifique-se que o [kanban-api](https://github.com/marcofavero3/kanban-api) está rodando em `http://localhost:8080`.

### 4. Rode o projeto

```bash
ng serve
```

Acesse em: `http://localhost:4200`

---

## 🏗️ Estrutura do Projeto

```
src/app
├── core/
│   ├── guards/        → AuthGuard — proteção de rotas
│   ├── interceptors/  → JWT interceptor automático
│   └── services/      → AuthService, BoardService, ColumnService, TaskService
├── features/
│   ├── auth/          → Login e cadastro
│   └── board/         → Board list e board detail (Kanban)
└── shared/
    ├── components/    → BoardDialog
    └── models/        → Interfaces TypeScript
```

---

## 👨‍💻 Desenvolvedor

**Marco Antonio Favero Junior**
Full-Stack Developer — Java Spring Boot & Angular
[Dev Dog Studio](https://devdogstudio.com.br)
