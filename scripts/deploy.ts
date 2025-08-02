import { ethers } from "hardhat";

async function main() {
  const [dono, destinatario] = await ethers.getSigners();
  const valorDoPagamentoInicial = ethers.parseEther("1.0"); 

  console.log("Fazendo deploy do contrato com a conta:", dono.address);
  console.log("Definindo o destinatario como:", destinatario.address);
  
  const contrato = await ethers.deployContract("PagamentoDireto", [destinatario.address], { value: valorDoPagamentoInicial});

  await contrato.waitForDeployment();

  console.log(`Contrato PagamentoDireto deployado em: ${contrato.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});