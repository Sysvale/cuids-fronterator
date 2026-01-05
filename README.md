<p align="center">
  <img
    src="https://github.com/user-attachments/assets/f5de8089-e4ca-4235-8a4d-4695731e58a9"
    width="600"
    alt="Gemini Generated Image"
  />
</p>


# Cuids Generator 🚀

[![Tests](https://github.com/Sysvale/cuids-fronterator/actions/workflows/ci.yml/badge.svg)](https://github.com/sysvale/cuids-fronterator/actions)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

O **Cuids Generator** é uma ferramenta de linha de comando para Vue.js 3 projetada para acelerar a criação de módulos. Ele cria uma estrutura de pastas para aplicações front end, focado na separação de responsabilidades entre arquivos TS puros e componentes Vue.js 3.

---

## 📋 Requisitos

Antes de começar, verifique se seu ambiente atende aos requisitos mínimos:

- **Node.js**: `^18.0.0` (Recomendado `22.0.0`)
- **[Cuida](https://www.npmjs.com/package/@sysvale/cuida)**: `3.0.0` ou superior
- **[SHOW](https://www.npmjs.com/package/@sysvale/show)**: `1.0.0` ou superior.

---

## ⚙️ Instalação

Execute o comando

```bash
npm install @sysvale/cuids-generator
```

## 🛠️ Como usar

Executando o comando:

```bash
npx cuids-generator
```
O que o comando faz:
- Interface Interativa: Pergunta o nome da Entidade (em inglês) e cria uma estrutura de feature completa baseada nela;
- Feature do Vue.js: Cria uma estrutura de pastas atreladas ao Vue.js da sua aplicação, em `resources/js/features/<NomeDaEntidade>`, contendo página, componente e estrutura de rotas e adiciona as novas rotas às rotas da sua aplicação,
desde que existe um arquivo geral de configuração de rotas em `resources/js/core/routes/index.js`;
- Gerenciamento de dados e comunicação com API: Cria uma estrutura de pastas, independente de frameworks, contendo toda a lógica de services, além da definição base de um model utilizado no front end, para definições, em `resources/js/shared/domain/<nomeDaEntidade>`.

## 🧪 Desenvolvimento e Testes
Este pacote utiliza o Vitest para garantir cobertura do comando de geração de módulos, verificando a cobertura com o coverage.
- Para rodar os testes:
```bash
    npm run test
```
- Cobertura
```bash
    npm run test:coverage
```

- Compilação
```bash
    npm run build
```

## 📄 Licença
Este projeto está licenciado sob a Apache License 2.0.
