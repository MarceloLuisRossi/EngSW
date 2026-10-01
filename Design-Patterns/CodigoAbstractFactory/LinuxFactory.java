public class LinuxFactory implements GUIFactory {
    @Override
    public Botao criarBotao() {
        return new BotaoLinux(); // Retorna a instância do botão Linux
    }

    @Override
    public Checkbox criarCheckbox() {
        return new CheckboxLinux(); // Retorna a instância da checkbox Linux
    }
}