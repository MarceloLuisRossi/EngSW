
from abc import ABC, abstractmethod

# 1. A Interface que define a "mensagem" que todos os estados devem entender
class EstadoBotao(ABC):
    @abstractmethod
    def apertar_botao(self):
        pass

# 2. Os Estados Concretos (Comportamentos isolados)
class EstadoMusica(EstadoBotao):
    def apertar_botao(self):
        return "🎵 Aumentando o volume da música!"

class EstadoChamada(EstadoBotao):
    def apertar_botao(self):
        return "📞 Silenciando o toque do telefone!"

class EstadoCamera(EstadoBotao):
    def apertar_botao(self):
        return "📸 Tirando uma foto (Click!)"

# 3. O Contexto (O seu celular, que apenas aponta para o estado atual)
class Smartphone:
    def __init__(self, estado_inicial: EstadoBotao):
        self.estado_atual = estado_inicial

    def mudar_estado(self, novo_estado: EstadoBotao):
        self.estado_atual = novo_estado

    def apertar_botao_volume(self):
        # A MÁGICA AQUI: Não tem if/else! Ele apenas delega para o estado ativo.
        resultado = self.estado_atual.apertar_botao()
        print(resultado)

# ==========================================
# TESTANDO O CÓDIGO
# ==========================================
if __name__ == "__main__":
    # Começamos no estado de Música
    meu_celular = Smartphone(EstadoMusica())
    meu_celular.apertar_botao_volume()  # Saída: 🎵 Aumentando o volume...

    # Celular toca, mudamos o estado
    meu_celular.mudar_estado(EstadoChamada())
    meu_celular.apertar_botao_volume()  # Saída: 📞 Silenciando o toque...

    # Abrimos a câmera
    meu_celular.mudar_estado(EstadoCamera())
    meu_celular.apertar_botao_volume()  # Saída: 📸 Tirando uma foto...