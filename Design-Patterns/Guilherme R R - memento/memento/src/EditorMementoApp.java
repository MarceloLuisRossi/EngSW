import javax.swing.*;
import java.awt.*;
import java.util.Stack;

public class EditorMementoApp extends JFrame {


    public static class EditorMemento {
        private final String text;

        public EditorMemento(String text) {
            this.text = text;
        }

        public String getText() {
            return text;
        }
    }


    public static class TextEditorOriginator {
        private String text = "";

        public void setText(String text) {
            this.text = text;
        }

        public String getText() {
            return text;
        }

        public EditorMemento saveToMemento() {
            return new EditorMemento(text);
        }

        public void restoreFromMemento(EditorMemento memento) {
            this.text = memento.getText();
        }
    }


    public static class HistoryCaretaker {
        private final Stack<EditorMemento> undoStack = new Stack<>();
        private final Stack<EditorMemento> redoStack = new Stack<>();
        private final TextEditorOriginator editor;

        public HistoryCaretaker(TextEditorOriginator editor) {
            this.editor = editor;
        }

        public void backup() {
            undoStack.push(editor.saveToMemento());
            redoStack.clear();
        }

        public void undo() {
            if (!undoStack.isEmpty()) {
                redoStack.push(editor.saveToMemento());
                EditorMemento previousState = undoStack.pop();
                editor.restoreFromMemento(previousState);
            }
        }

        public void redo() {
            if (!redoStack.isEmpty()) {
                undoStack.push(editor.saveToMemento());
                EditorMemento nextState = redoStack.pop();
                editor.restoreFromMemento(nextState);
            }
        }
    }


    private JTextArea textArea;
    private TextEditorOriginator editor;
    private HistoryCaretaker history;

    public EditorMementoApp() {

        editor = new TextEditorOriginator();
        history = new HistoryCaretaker(editor);

        setTitle("Memento");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());

        textArea = new JTextArea();
        textArea.setFont(new Font("Arial", Font.PLAIN, 16));
        add(new JScrollPane(textArea), BorderLayout.CENTER);

        JPanel panel = new JPanel();

        JButton btnSaveState = new JButton("Gravar Estado");
        JButton btnUndo = new JButton("Desfazer (Undo)");
        JButton btnRedo = new JButton("Refazer (Redo)");

        btnSaveState.addActionListener(e -> {
            editor.setText(textArea.getText());
            history.backup();
            System.out.println("Estado salvo!");
        });

        btnUndo.addActionListener(e -> {
            editor.setText(textArea.getText());
            history.undo();
            textArea.setText(editor.getText());
        });

        btnRedo.addActionListener(e -> {
            editor.setText(textArea.getText());
            history.redo();
            textArea.setText(editor.getText());
        });

        panel.add(btnSaveState);
        panel.add(btnUndo);
        panel.add(btnRedo);

        add(panel, BorderLayout.SOUTH);


        history.backup();
    }


    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new EditorMementoApp().setVisible(true);
        });
    }
}