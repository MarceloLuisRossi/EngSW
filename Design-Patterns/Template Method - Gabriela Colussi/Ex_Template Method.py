from abc import ABC, abstractmethod

class ConstrucaoCasa(ABC):

    # Template Method
    def construir_casa(self):
        self.construir_fundacao()
        self.construir_paredes()
        self.instalar_telhado()
        self.instalar_portas()
        self.adicionar_garagem()
        print("Casa construída com sucesso!\n")

    # Métodos comuns
    def construir_fundacao(self):
        print("Construindo fundação de concreto.")

    def construir_paredes(self):
        print("Construindo paredes de alvenaria.")

    # Métodos que variam nas subclasses
    @abstractmethod
    def instalar_telhado(self):
        pass

    @abstractmethod
    def instalar_portas(self):
        pass

    @abstractmethod
    def adicionar_garagem(self):
        pass


class CasaPadrao(ConstrucaoCasa):

    def instalar_telhado(self):
        print("Instalando telhado de cerâmica.")

    def instalar_portas(self):
        print("Instalando portas de madeira comum.")

    def adicionar_garagem(self):
        print("Garagem simples para 1 carro.")


class CasaLuxo(ConstrucaoCasa):

    def instalar_telhado(self):
        print("Instalando telhado premium com acabamento térmico.")

    def instalar_portas(self):
        print("Instalando portas de madeira nobre.")

    def adicionar_garagem(self):
        print("Garagem ampla para 3 carros.")


# Programa principal
print("=== CASA PADRÃO ===")
casa1 = CasaPadrao()
casa1.construir_casa()

print("=== CASA DE LUXO ===")
casa2 = CasaLuxo()
casa2.construir_casa()