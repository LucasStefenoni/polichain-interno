// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "hardhat/console.sol";

contract PagamentoDireto {
    address payable public destinatario;

    event PagamentoEfetuado(
        address de,
        address para,
        uint valor,
        uint data
    );

    constructor(address payable _destinatario) payable {
        require(_destinatario != address(0), "O endereco do destinatario nao pode ser nulo.");
        require(msg.value > 0, "Voce deve enviar um valor na criacao do contrato.");

        destinatario = _destinatario;

        (bool sucesso, ) = destinatario.call{value: msg.value}("");
        require(sucesso, "A transferencia inicial para o destinatario falhou.");

        emit PagamentoEfetuado(msg.sender, destinatario, msg.value, block.timestamp);
    }

    function efetuarPagamento() public payable {
        require(msg.value > 0, "O valor do pagamento deve ser maior que zero.");

        (bool sucesso, ) = destinatario.call{value: msg.value}("");
        require(sucesso, "A transferencia para o destinatario falhou.");
        
        emit PagamentoEfetuado(msg.sender, destinatario, msg.value, block.timestamp);
    }
}