

/**
 * @author marce
 * @version 1.0
 * @created 29-set-2026 15:12:42
 */
public class WindowsFactory implements GUIFactory {

	public WindowsFactory(){

	}

	@Override
	public Botao criarBotao(){
		return new BotaoWindows();
		}

	@Override
	public Checkbox criarCheckbox(){

		return new CheckboxWindows();
	}

}