class Handler:
    def __init__(self):
        self.next_handler = None

    def set_next(self, handler):
        self.next_handler = handler
        return handler  # permite encadear: a.set_next(b).set_next(c)

    def handle(self, pedido):
        if self.next_handler:
            return self.next_handler.handle(pedido)
        return None  # fim da cadeia, ninguem tratou
class ValidacaoHandler(Handler):
    def handle(self, pedido):
        if not pedido["valido"]:
            return "Pedido invalido: dados incompletos."
        return super().handle(pedido)  # repassa adiante
class EstoqueHandler(Handler):
    def handle(self, pedido):
        if not pedido["tem_estoque"]:
            return "Produto indisponivel em estoque."
        return "Pedido aprovado com sucesso!"
validacao = ValidacaoHandler()
estoque = EstoqueHandler()
validacao.set_next(estoque)

pedido = {"valido": True, "tem_estoque": True}
resultado = validacao.handle(pedido)
print(resultado)  # Pedido aprovado com sucesso!