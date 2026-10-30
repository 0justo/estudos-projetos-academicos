package ed.armseq;

public class PilhaInt {
    private int[] v;
    private int topo;

    public PilhaInt(int tamanho) {
        v = new int[tamanho];
    }
    public PilhaInt() {
        this(5);
    }

    // Quantos cabem na pilha (tamanho do array)
    public int capacidade() {
        return v.length;
    }
    // Se no de elementos presentes igualam capacidade
    public boolean cheia() {
        return topo == capacidade();
    }
    // Se no de elementos é zero
    public boolean vazia() {
        return topo == 0;
    }
    // Quantos elementos estão presentes na pilha
    public int comprimento() {
        return topo;
    }

    public void adicionar(int elemento) {
        if (cheia()) {
            throw new RuntimeException("Pilha cheia.");
        }
        v[topo] = elemento;
        topo++;
    }
    public int remover() {
        if (vazia()) {
            throw new RuntimeException("Pilha vazia.");
        }
        topo--;
        return v[topo];
    }
    public int elemento(int indice) {
        if (indice < 0 || indice >= comprimento()) {
            throw new RuntimeException("Índice inválido: " + indice);
        }
        return v[indice];
    }

    @Override
    public String toString() {
        String res = "topo{";
        for(int i=topo-1;i>0;i--) {
            res += v[i] + ",";
        }
        if (!vazia()) res += v[0];
        res += "}";
        return res;
    }
}
