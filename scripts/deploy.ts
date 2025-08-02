import { ethers } from "hardhat";

async function main() {
  const [dono] = await ethers.getSigners();

  const enderecoDestinatario = "0xE1a12Bf819Ba6e6Bb3043A3E8FF7Fc4d9D8E0008"; 
  const valorDoPagamentoInicial = ethers.parseEther("1.0"); 

  console.log(`Deployando com a conta: ${dono.address}`);
  console.log(`Definindo o destinatário como: ${enderecoDestinatario}`);
  console.log(`Enviando um pagamento inicial de 1 ETH...`);

  const contrato = await ethers.deployContract(
    "PagamentoDireto",
    [enderecoDestinatario],
    { value: valorDoPagamentoInicial }
  );

  await contrato.waitForDeployment();

  console.log(`Contrato deployado em: ${contrato.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});