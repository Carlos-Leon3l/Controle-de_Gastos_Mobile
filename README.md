# Controle de Gastos - Gerenciador Financeiro Pessoal

## Sobre o Projeto
O **Controle de Gastos** é um aplicativo mobile desenvolvido em React Native focado na gestão financeira pessoal. O objetivo principal do projeto é permitir o cadastro, listagem e acompanhamento do saldo em tempo real de despesas e receitas de uma forma altamente imersiva e responsiva.

### Principais Funcionalidades Implementadas:
- **Painel Interativo de Valores:** Cálculo automático de saldo atual com filtros dinâmicos que modificam a lista ao tocar em "Receitas" ou "Despesas".
- **Navegação de Calendário:** Modal customizado e unificado para selecionar meses e anos específicos.
- **Persistência de Dados Offline:** Utilização profunda do motor **SQLite**, garantindo que o app funcione sem internet, com tabelas relacionais salvas diretamente na memória física do smartphone.
- **Barra de Navegação Flutuante:** Tab bar inferior com botões interativos.

---

## 📂 Estrutura de Pastas e Arquitetura

```text
/
├── assets/                 # Imagens, ícones base e logotipo personalizado
├── src/
│   ├── components/         # Componentes de interface globais (Ex: CustomTabBar, MonthSelector, SummaryCard)
│   ├── contexts/           # Gestão central do Estado Global usando Context API (ExpenseContext.js)
│   ├── database/           # Núcleo do SQLite (Schema de construção e Repository Patterns)
│   ├── features/           # Componentes atrelados exclusivamente a regras de negócio (ExpenseItem.js)
│   ├── mock/               # Injeção de dados simulados (Fallback Data) para homologação Web
│   ├── navigation/         # Roteador mestre do React Navigation (routes.js)
│   ├── screens/            # Visões principais e blocos montados (HomeScreen, AddExpenseScreen)
│   ├── styles/             # Paleta Neon (colors.js) e estilização universal em folha única (globalStyles.js)
│   └── utils/              # Funções utilitárias como formatadores de string/moeda (formatters.js)
├── App.js                  # Ponto de entrada, provedor de SafeArea e inicializador do Banco
├── index.js                # Root registration do framework Expo
└── app.json                # Manifesto e propriedades da Build Mobile
```

---

## Testes de Ambiente (EndeavourOS e ADB)
O processo de testes passou por desafios específicos do ambiente Linux (distribuição **EndeavourOS**). O Expo tenta estabelecer conexões via interface LAN (Wi-Fi), mas sofre bloqueios no gerenciador de rede/firewall dessa distribuição.
Para garantir sincronia e não atrasar os testes, fiz a conexão via **Android Debug Bridge (ADB)** e um cabo USB:
1. O aparelho físico Android foi colocado em modo *Depuração USB (USB Debugging)*.
2. Usei o comando forçado na CLI:
   ```bash
   npx expo start --localhost
   ```
3. Permitindo que o tráfego do Node.js "engane" a rede e atravesse (Reverse Port Forwarding) direto pro dispositivo via cabo.
Conseguindo uma conexão completa com o dispositivo.

---

## Passo a Passo para Testar
O aplicativo é incrivelmente simples e **vai funcionar normalmente de primeira**, para conseguir rodar o projeto locamente, siga os passos abaixo:

### Preparação
1. Tenha certeza de ter o **Node.js** em seu computador.
2. Instale o **Expo Go** na sua loja de aplicativos nativa (App Store ou Google Play).

### Execução Local
1. Descompacte o projeto e, no terminal, digite para instalar as dependências:
   ```bash
   npm install
   ```
2. Após a barra de progresso terminar, inicie o servidor com:
   ```bash
   npx expo start
   ```

### No Celular
3. O terminal mostrará um QRCode na sua tela.
   - **Android:** Abra o aplicativo do Expo Go e selecione "Scan QR Code".
   - **iPhone (iOS):** Abra o aplicativo da Câmera normal e aponte para o QRCode. Uma barra amarela pedirá permissão para abrir no Expo Go.
4. Aguarde a tela de "Bundling" e divirta-se criando contas, adicionando despesas e navegando entre as abas e os meses! Todo o salvamento é instantâneo no seu celular.
