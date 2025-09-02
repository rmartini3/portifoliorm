# SISTEMA DE GESTÃO DE TAREFAS
# Autor: [Seu Nome]

from datetime import datetime
from enum import Enum

class Prioridade(Enum):
    BAIXA = 1
    MEDIA = 2
    ALTA = 3

class Tarefa:
    def __init__(self, titulo: str, descricao: str = "", prioridade: Prioridade = Prioridade.MEDIA):
        self.titulo = titulo
        self.descricao = descricao
        self.prioridade = prioridade
        self.criada_em = datetime.now()
        self.concluida = False
        self.id = hash(f"{titulo}{datetime.now().timestamp()}")

    def concluir(self):
        self.concluida = True

    def __str__(self):
        status = "✓" if self.concluida else "✗"
        return f"[{status}] {self.titulo} ({self.prioridade.name})"

class GerenciadorTarefas:
    def __init__(self):
        self.tarefas: dict[int, Tarefa] = {}

    def adicionar_tarefa(self, titulo: str, **kwargs) -> int:
        nova_tarefa = Tarefa(titulo, **kwargs)
        self.tarefas[nova_tarefa.id] = nova_tarefa
        return nova_tarefa.id

    def listar_tarefas(self, filtrar_concluidas: bool = None):
        if filtrar_concluidas is not None:
            return [t for t in self.tarefas.values() if t.concluida == filtrar_concluidas]
        return list(self.tarefas.values())

    def buscar_por_prioridade(self, prioridade: Prioridade):
        return [t for t in self.tarefas.values() if t.prioridade == prioridade]

# Exemplo de uso
if __name__ == "__main__":
    gm = GerenciadorTarefas()
    gm.adicionar_tarefa("Estudar Python", prioridade=Prioridade.ALTA)
    gm.adicionar_tarefa("Fazer compras", prioridade=Prioridade.BAIXA)
    
    for tarefa in gm.listar_tarefas():
        print(tarefa)