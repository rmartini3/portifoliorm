# SISTEMA BANCÁRIO COM PYTHON
# Autor: [Seu Nome]
# Versão: 2.0

from datetime import datetime
from typing import List, Tuple
import json

class ContaBancaria:
    def __init__(self, titular: str, saldo_inicial: float = 0.0, numero_conta: str = None):
        self.titular = titular
        self.saldo = saldo_inicial
        self.numero = numero_conta or self._gerar_numero_conta()
        self._extrato: List[Tuple] = []
        self._ativa = True

    def _gerar_numero_conta(self) -> str:
        return f"CONTA_{datetime.now().strftime('%Y%m%d%H%M%S')}"

    @property
    def ativa(self) -> bool:
        return self._ativa

    def depositar(self, valor: float) -> None:
        if not self._ativa:
            raise ValueError("Conta inativa")
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        
        self.saldo += valor
        self._extrato.append(("DEPÓSITO", valor, datetime.now()))

    def sacar(self, valor: float) -> None:
        if not self._ativa:
            raise ValueError("Conta inativa")
        if valor <= 0:
            raise ValueError("Valor deve ser positivo")
        if valor > self.saldo:
            raise ValueError("Saldo insuficiente")
        
        self.saldo -= valor
        self._extrato.append(("SAQUE", valor, datetime.now()))

    def transferir(self, destino: 'ContaBancaria', valor: float) -> None:
        self.sacar(valor)
        destino.depositar(valor)
        self._extrato.append(("TRANSFERÊNCIA", valor, datetime.now()))

    def extrato(self, ultimos_n: int = None) -> List[Tuple]:
        if ultimos_n:
            return self._extrato[-ultimos_n:]
        return self._extrato.copy()

    def to_dict(self) -> dict:
        return {
            'titular': self.titular,
            'saldo': self.saldo,
            'numero': self.numero,
            'ativa': self._ativa
        }

class Banco:
    def __init__(self, nome: str):
        self.nome = nome
        self.contas: dict = {}

    def abrir_conta(self, titular: str, saldo_inicial: float = 0.0) -> ContaBancaria:
        nova_conta = ContaBancaria(titular, saldo_inicial)
        self.contas[nova_conta.numero] = nova_conta
        return nova_conta

    def buscar_conta(self, numero_conta: str) -> ContaBancaria:
        return self.contas.get(numero_conta)

    def salvar_dados(self, arquivo: str):
        dados = {num: conta.to_dict() for num, conta in self.contas.items()}
        with open(arquivo, 'w') as f:
            json.dump(dados, f)