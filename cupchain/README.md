# 🧾 Cupchain — Plataforma de Cupons NFT

**Cupchain** é um sistema descentralizado que permite que lojas emitam cupons como NFTs. Os cupons podem ser usados, transferidos e até revendidos em marketplaces, com rastreabilidade garantida pela blockchain.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RainbowKit](https://www.rainbowkit.com/) + [Wagmi](https://wagmi.sh/)
- Axios para upload de metadados no [Pinata](https://www.pinata.cloud/)

### Blockchain
- [Solidity ^0.8.20](https://docs.soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- Rede: **Sepolia Testnet**
- Contrato: `CouponNFT.sol` (ERC-721)

---

## ✨ Funcionalidades

- [x] Geração de cupons NFT com dados customizados
- [x] Upload automático dos metadados para o IPFS
- [x] Mint automático dos NFTs
- [x] Interface de conexão com carteira via RainbowKit

---

## 🛠️ Como Rodar Localmente

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/cupchain.git
cd cupchain
