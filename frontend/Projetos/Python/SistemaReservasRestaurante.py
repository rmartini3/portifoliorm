# SISTEMA DE RESERVAS PARA RESTAURANTE
# Autor: [Seu Nome]

from datetime import datetime, timedelta
from typing import List, Optional
import pickle

class Reserva:
    def __init__(self, cliente: str, pessoas: int, horario: datetime, mesa: int):
        self.cliente = cliente
        self.pessoas = pessoas
        self.horario = horario
        self.mesa = mesa
        self.id = hash(f"{cliente}{horario.timestamp()}")

    def __str__(self):
        return f"Reserva #{self.id}: {self.cliente} - {self.pessoas} pessoas - Mesa {self.mesa}"

class Restaurante:
    def __init__(self, nome: str, mesas: int):
        self.nome = nome
        self.mesas = mesas
        self.reservas: dict[int, Reserva] = {}
        self.horario_funcionamento = (11, 23)  # 11h às 23h

    def verificar_disponibilidade(self, horario: datetime, mesa: int) -> bool:
        if not (self.horario_funcionamento[0] <= horario.hour < self.horario_funcionamento[1]):
            return False

        for reserva in self.reservas.values():
            if reserva.mesa == mesa and abs(reserva.horario - horario) < timedelta(hours=2):
                return False
        return True

    def fazer_reserva(self, cliente: str, pessoas: int, horario: datetime) -> Optional[Reserva]:
        for mesa in range(1, self.mesas + 1):
            if self.verificar_disponibilidade(horario, mesa):
                nova_reserva = Reserva(cliente, pessoas, horario, mesa)
                self.reservas[nova_reserva.id] = nova_reserva
                return nova_reserva
        return None

    def cancelar_reserva(self, reserva_id: int) -> bool:
        if reserva_id in self.reservas:
            del self.reservas[reserva_id]
            return True
        return False

    def salvar_dados(self, arquivo: str):
        with open(arquivo, 'wb') as f:
            pickle.dump(self.reservas, f)

    def carregar_dados(self, arquivo: str):
        try:
            with open(arquivo, 'rb') as f:
                self.reservas = pickle.load(f)
        except FileNotFoundError:
            self.reservas = {}

# Exemplo de uso
if __name__ == "__main__":
    restaurante = Restaurante("Sabor Mineiro", 10)
    
    # Tentar fazer reserva
    reserva = restaurante.fazer_reserva(
        "João Silva",
        4,
        datetime(2024, 12, 25, 19, 30)
    )
    
    if reserva:
        print(f"Reserva confirmada: {reserva}")
    else:
        print("Não há mesas disponíveis para este horário")