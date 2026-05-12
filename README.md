# TaskFlow — Aplicação de Tarefas

Aplicação moderna de gerenciamento de tarefas desenvolvida com React, Context API e React Router DOM como parte do **Desafio 2 da Trilha React — DEVstart**.

## ✨ Funcionalidades

- ✅ **Criar** tarefas com título, descrição, prioridade e categoria
- 📋 **Listar** tarefas com filtros:
  - Todas
  - Pendentes
  - Concluídas
- ↕️ **Ordenar** tarefas:
  - Mais recentes
  - Prioridade
  - Ordem alfabética
- ✏️ **Editar** qualquer tarefa existente
- 🗑️ **Excluir** tarefas com animação de saída
- ☑️ **Marcar como concluída** diretamente na lista
- 💾 **Persistência** via `localStorage` (dados mantidos entre sessões)
- 📱 **Interface responsiva** para desktop e mobile
- 🎨 **UI moderna** com tema dark/neon e animações suaves

## 🛠️ Tecnologias

- **React 18** com hooks (`useState`, `useEffect`, `useContext`)
- **React Router DOM v6** — rotas `/`, `/add-task`, `/edit-task/:id`
- **Context API** — gerenciamento global das tarefas via `TaskContext`
- **localStorage** — persistência entre sessões
- **JavaScript**
- **CSS3** com variáveis customizadas e responsividade

## 📁 Estrutura

```txt
src/
├── context/
│   └── TaskContext.js      # Context + Provider + lógica CRUD
├── components/
│   ├── Navbar.js / .css    # Barra de navegação com estatísticas
│   ├── TaskCard.js / .css  # Card individual de tarefa
│   └── TaskForm.js / .css  # Formulário reutilizável (criar/editar)
├── pages/
│   ├── Home.js / Home.css  # Página principal com lista e filtros
│   ├── AddTask.js          # Página para criar tarefa
│   ├── EditTask.js         # Página para editar tarefa
│   └── FormPage.css        # Estilos compartilhados das páginas de formulário
├── App.js                  # Rotas e providers
├── index.js                # Entry point
└── index.css               # Estilos globais + variáveis CSS
```

## 📸 Preview

```
![Preview da aplicação](./assets/imagem.png)

```

## 🚀 Como executar

```bash
# Clone o repositório
git clone https://github.com/Sowza82/aplicacao-de-tarefas.git

# Entre na pasta do projeto
cd aplicacao-de-tarefas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Acesse em:

```txt
http://localhost:3000
```

## 📦 Build para produção

```bash
npm run build
```

## 🌐 Deploy

Deploy em produção via Netlify:

```txt
https://seu-app.netlify.app
```

## 📚 Aprendizados

Durante o desenvolvimento deste projeto foram praticados conceitos importantes do ecossistema React:

- Componentização
- CRUD completo
- Context API
- Gerenciamento global de estado
- Navegação com React Router
- Persistência com localStorage
- Organização de pastas
- Responsividade
- UX/UI moderna
- Separação de responsabilidades

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com foco em prática de:

- React moderno
- Arquitetura de componentes
- Gerenciamento de estado
- Experiência do usuário
- Estruturação de aplicações Front-End

---

Desenvolvido por **Tatiane Souza | SowzaTech** 🚀
