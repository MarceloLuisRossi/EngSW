interface Expression {
    int interpret();
}

class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret() {
        return number;
    }
}

class AdditionExpression implements Expression {
    private Expression left;
    private Expression right;

    public AdditionExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() + right.interpret();
    }
}

class MultiplicationExpression implements Expression {
    private Expression left;
    private Expression right;

    public MultiplicationExpression(Expression left, Expression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int interpret() {
        return left.interpret() * right.interpret();
    }
}

public class Main {
    public static void main(String[] args) {

        System.out.println("x + y * z");
        int x = 2;
        int y = 3;
        int z = 4;

        Expression expression = new AdditionExpression(
                new NumberExpression(x),
                new MultiplicationExpression(
                        new NumberExpression(y),
                        new NumberExpression(z)
                )
        );

        int result = expression.interpret();
        System.out.println("Result: " + result);
    }
}