public class PilhaInt {
    private int v[];
    private int topo = 0;

    public PilhaInt(int tam) {
        v = new int[tam];
    }

    public PilhaInt() {
        this(4);
    }

    public int comprimento() {
        return topo;
    }

    public int capacidade() {
        return v.length;
    }

    public void adicionar(int elem) {
        v[topo] = elem;
        topo++;
    }

    public int remover() {
        topo--;
        return v[topo];
    }

    public boolean vazia() {
        return topo == 0;
    }

    public boolean cheia() {
        return topo == v.length;
    }

    public int elemento(int p) {
        return v[p];
    }

    public String toString() {
        String s = "[";
        for (int i = 0; i < topo; i++) {
            s = s + v[i];
            if (i < topo - 1) {
                s = s + ",";
            }
        }
        s = s + "]";
        return s;
    }
}
