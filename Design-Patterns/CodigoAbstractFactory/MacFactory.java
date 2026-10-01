

/**
 * @author marce
 * @version 1.0
 * @created 29-set-2026 15:13:01
 */
public class MacFactory implements GUIFactory {

	public MacFactory(){

	}

	@Override
	public Botao criarBotao() {
		return new BotaoMac();
	}

	@Override
	public Checkbox criarCheckbox() {
		return new CheckboxMac();
	}
}