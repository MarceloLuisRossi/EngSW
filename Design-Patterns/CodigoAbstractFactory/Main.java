public class Main {
    public static void main(String[] args) {
        System.out.println("--- Inicializando Aplicativo com Abstract Factory ---");

        // 1. Instanciamos a fábrica do Windows
        GUIFactory fabricaWindows = new WindowsFactory();

        // 2. Criamos os produtos através da fábrica do Windows
        Botao botaoWin = fabricaWindows.criarBotao();
        Checkbox checkboxWin = fabricaWindows.criarCheckbox();

        // 3. Executamos os produtos do Windows
        botaoWin.renderizar();
        checkboxWin.renderizar();

        System.out.println("\n--- Trocando a Fábrica em Tempo de Execução ---");

        // 4. Mudamos a fábrica para Mac (o cliente apenas muda a instância da fábrica)
        GUIFactory fabricaMac = new MacFactory();

        // 5. Criamos os produtos através da fábrica do Mac
        Botao botaoMac = fabricaMac.criarBotao();
        Checkbox checkboxMac = fabricaMac.criarCheckbox();

        // 6. Executamos os produtos do Mac
        botaoMac.renderizar();
        checkboxMac.renderizar();

        System.out.println("\n--- Trocando a Fábrica para Linux ---");

        // 7. Mudamos a fábrica para Linux (Nova fábrica adicionada!)
        GUIFactory fabricaLinux = new LinuxFactory();

        // 8. Criamos os produtos através da fábrica do Linux
        Botao botaoLinux = fabricaLinux.criarBotao();
        Checkbox checkboxLinux = fabricaLinux.criarCheckbox();

        // 9. Executamos os produtos do Linux
        botaoLinux.renderizar();
        checkboxLinux.renderizar();
    }
}