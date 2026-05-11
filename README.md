# TaskFlow — Aplicação de Tarefas

Aplicação React para gerenciamento de tarefas desenvolvida como **Desafio 2** da Trilha React do DEVstart.

## ✨ Funcionalidades

- ✅ **Criar** tarefas com título, descrição, prioridade e categoria
- 📋 **Listar** tarefas com filtro (todas / pendentes / concluídas) e ordenação
- ✏️ **Editar** qualquer tarefa existente
- 🗑️ **Excluir** tarefas com animação de saída
- ☑️ **Marcar como concluída** diretamente na lista
- 💾 **Persistência** via `localStorage` (dados mantidos entre sessões)

## 🛠️ Tecnologias

- **React 18** com hooks (`useState`, `useEffect`, `useContext`)
- **React Router DOM v6** — rotas `/`, `/add-task`, `/edit-task/:id`
- **Context API** — estado global das tarefas via `TaskContext`
- **localStorage** — persistência entre sessões
- CSS puro com variáveis (tema dark/neon)

## 📁 Estrutura

```
src/
├── context/
│   └── TaskContext.js      # Context + Provider + lógica CRUD
├── components/
│   ├── Navbar.js / .css    # Barra de navegação com stats
│   ├── TaskCard.js / .css  # Card individual de tarefa
│   └── TaskForm.js / .css  # Formulário reutilizável (add/edit)
├── pages/
│   ├── Home.js / Home.css  # Página principal com lista e filtros
│   ├── AddTask.js          # Página para criar tarefa
│   ├── EditTask.js         # Página para editar tarefa
│   └── FormPage.css        # Estilos compartilhados das páginas de form
├── App.js                  # Rotas e providers
├── index.js                # Entry point
└── index.css               # Estilos globais + variáveis CSS
```

## 🚀 Como executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/aplicacao-de-tarefas.git
cd aplicacao-de-tarefas

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

Acesse em: [http://localhost:3000](http://localhost:3000)

## 📦 Build para produção

```bash
npm run build
```

---

Desenvolvido por **Tatiane Souza** | SowzaTech 🚀
