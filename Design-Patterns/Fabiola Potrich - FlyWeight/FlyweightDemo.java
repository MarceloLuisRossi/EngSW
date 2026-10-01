import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Exemplo do padrão Flyweight (GoF) aplicado a uma floresta com um grande
 * numero de arvores.
 *
 * Estado INTRINSECO (compartilhado, imutavel): nome, cor e textura do tipo
 * de arvore -> fica dentro do Flyweight (TreeType).
 *
 * Estado EXTRINSECO (varia por instancia): posicao (x, y) de cada arvore
 * -> fica no contexto (Tree) e e passado por parametro ao Flyweight.
 */
public class FlyweightDemo {

    // ---------- FLYWEIGHT ----------
    // Guarda apenas o estado intrinseco (compartilhado e imutavel).
    static class TreeType {
        private final String nome;
        private final String cor;
        private final String textura;

        TreeType(String nome, String cor, String textura) {
            this.nome = nome;
            this.cor = cor;
            this.textura = textura;
        }

        // x e y sao o estado EXTRINSECO, recebido por parametro
        void draw(int x, int y) {
            System.out.printf("Desenhando %s (%s, %s) em (%d, %d)%n",
                    nome, cor, textura, x, y);
        }
    }

    // ---------- FLYWEIGHT FACTORY ----------
    // Garante que tipos de arvore iguais compartilhem a mesma instancia.
    static class TreeFactory {
        private static final Map<String, TreeType> types = new HashMap<>();

        static TreeType getTreeType(String nome, String cor, String textura) {
            String chave = nome + "-" + cor + "-" + textura;
            return types.computeIfAbsent(chave, k -> {
                System.out.println("Criando novo TreeType: " + k);
                return new TreeType(nome, cor, textura);
            });
        }

        static int totalTypes() {
            return types.size();
        }
    }

    // ---------- CONTEXTO ----------
    // Guarda o estado extrinseco (posicao) e uma referencia ao flyweight.
    static class Tree {
        private final int x, y;
        private final TreeType type;

        Tree(int x, int y, TreeType type) {
            this.x = x;
            this.y = y;
            this.type = type;
        }

        void draw() {
            type.draw(x, y);
        }
    }

    // ---------- CLIENT ----------
    static class Forest {
        private final List<Tree> trees = new ArrayList<>();

        void plantTree(int x, int y, String nome, String cor, String textura) {
            TreeType type = TreeFactory.getTreeType(nome, cor, textura);
            trees.add(new Tree(x, y, type));
        }

        void draw() {
            trees.forEach(Tree::draw);
        }

        int size() {
            return trees.size();
        }
    }

    public static void main(String[] args) {
        Forest forest = new Forest();

        // 100.000 arvores, mas apenas 2 tipos distintos
        for (int i = 0; i < 50_000; i++) {
            forest.plantTree((int) (Math.random() * 1000), (int) (Math.random() * 1000),
                    "Pinheiro", "Verde-escuro", "pinheiro.png");
            forest.plantTree((int) (Math.random() * 1000), (int) (Math.random() * 1000),
                    "Carvalho", "Verde-claro", "carvalho.png");
        }

        System.out.println("Arvores plantadas: " + forest.size());
        System.out.println("Objetos TreeType criados: " + TreeFactory.totalTypes());

        // Descomente para ver o desenho de todas as 100.000 arvores:
        // forest.draw();

        // Bonus: exemplos de Flyweight embutidos no proprio Java
        Integer a = Integer.valueOf(100), b = Integer.valueOf(100);
        System.out.println("Integer.valueOf(100) == Integer.valueOf(100) -> " + (a == b)); // true

        Integer c = 1000, d = 1000;
        System.out.println("Integer 1000 == Integer 1000 (fora do cache) -> " + (c == d)); // false
    }
}
