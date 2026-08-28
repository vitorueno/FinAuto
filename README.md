# FinAuto 🚗

[![CI](https://github.com/vitorueno/FinAuto/actions/workflows/ci.yml/badge.svg)](https://github.com/vitorueno/FinAuto/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**🔗 Live: https://vitorueno.github.io/FinAuto/**

A car financing calculator: type the vehicle price, the down payment, the monthly
interest rate and the number of installments, and see the monthly payment, the
total paid, and how much of that total is interest — in BRL or USD, in English or
Portuguese.

> ⚠️ This is a study project, built to practice TDD and layered architecture in
> React. It may contain errors, and the numbers it produces are not financial
> advice — don't use them to make a real decision.

## ✨ Features

- **Amortization math** — fixed-installment (Price/PMT) schedule, plus an approximate effective annual rate.
- **Two currencies, two languages** — BRL/USD and EN/PT, switchable without losing what you typed.
- **Right-to-left input masks** — amount and rate fields fill from the cents, like a banking app.
- **Animated results** — values count up to the final number, with a donut showing the interest share.
- **Responsive** — the results pane moves below the form on narrow screens.

## 🚀 Running locally

Requires Node 24 (see `.nvmrc`).

```bash
git clone git@github.com:vitorueno/FinAuto.git
cd FinAuto
npm install
npm run dev
```

Other commands:

```bash
npm test         # run the test suite
npm run build    # production build into dist/
```

## 🏗️ Architecture

Four layers, each depending only on the one below it. The rule that keeps them
honest: **`src/domain/` imports nothing from React.**

```
src/
├── domain/       # pure functions: math, masks, parsing, formatting, validation
├── hooks/        # React state and effects, built on top of domain
├── components/   # presentational — receive values and callbacks, decide nothing
├── i18n/         # typed copy dictionary (EN/PT)
└── styles/       # design tokens and global CSS
```

`App.tsx` composes the layers: `useLoanForm` holds the state and calls into
`domain/`, and the components only render what it hands them. Everything was
written test-first, and that separation is what makes it practical: the
amortization formula, the input masks and the validation rules are all covered by
tests that never mount a component.

## 🤝 Contributing

Issues and PRs are welcome. A pre-commit hook runs Prettier and oxlint on staged
files; CI additionally runs the full test suite and the production build, so make
sure `npm test` and `npm run build` pass before opening a PR. Commits follow
[Conventional Commits](https://www.conventionalcommits.org/).

## 📄 License

MIT — see [LICENSE](LICENSE).
