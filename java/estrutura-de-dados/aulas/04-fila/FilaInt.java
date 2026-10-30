public class FilaInt {
    private int[] v;
    private int fim = 0;

    public FilaInt(int tam) {
        v = new int[tam];
    }
    public FilaInt()  {
        this(5);
    }

    public void adicionar(int elem) {
        if (cheia()) {
            throw new RuntimeException("Fila cheia.");
        }
        v[fim] = elem;
        fim++;
    }

    public int remover() {
        if (vazia()) {
            throw new RuntimeException("Fila vazia.");
        }
        int aux = v[0];
        for (int i=0; i < fim-1; i++) {
            v[i] = v[i+1];
        }
        fim--;
        return aux;
    }

    public int elemento(int pos) {
        if (pos < 0 || pos >= fim) {
            throw new RuntimeException("Posição inválida: " + pos);
        }
        return v[pos];
    }

    public int capacidade() {
        return v.length;
    }

    public int comprimento() {
        return fim;
    }
    public boolean cheia() {
        return fim == v.length;
    }

    public boolean vazia() {
        return fim == 0;
    }

    @Override
    public String toString() {
        StringBuilder res = new StringBuilder("{ ");
        for (int i = 0; i < fim - 1; i++) {
            res.append(v[i]);
            res.append(", ");
        }
        if (fim > 0) {
            res.append(v[fim - 1]);
        }
        res.append(" }");
        return res.toString();
    }
}
