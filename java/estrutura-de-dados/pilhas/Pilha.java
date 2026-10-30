public class Pilha {
    private Object[] conteudo;
    private int topo;

    public Pilha() {
        topo = 0;
        conteudo = new Object[4];
    }

    public Pilha(int tamanho) {
        topo = 0;
        conteudo = new Object[tamanho];
    }

    public int capacidade() {
        return conteudo.length;
    }

    public int comprimento() {
        return topo;
    }

    public boolean cheia() {
        return topo == conteudo.length;
    }

    public void adicionar(Object valor) {
        if (topo == conteudo.length) {
            throw new RuntimeException("pilha cheia");
        }
        conteudo[topo] = valor;
        topo++;
    }

    public Object elemento(int posicao) {
        if (posicao < 0 || posicao >= topo) {
            throw new RuntimeException("posição inválida: " + posicao);
        }
        return conteudo[posicao];
    }

    public Object remover() {
        if (topo == 0) {
            throw new RuntimeException("pilha vazia");
        }
        topo--;
        return conteudo[topo];
    }

    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < topo - 1; i++) {
            sb.append(conteudo[i]);
            sb.append(",");
        }
        if (topo > 0) {
            sb.append(conteudo[topo - 1]);
        }
        sb.append("]");
        return sb.toString();
    }

    public boolean vazia() {
        return topo == 0;
    }
}