public class Pilha {
    private ListaLigada lista;

    public Pilha() {
        lista = new ListaLigada();
    }

    public int comprimento() {
        return lista.comprimento();
    }

    public void adicionar(Object valor) {
        lista.inserir(0, valor);
    }

    // posicao 0 = base da pilha, comprimento()-1 = topo
    public Object elemento(int posicao) {
        if (posicao < 0 || posicao >= comprimento()) {
            throw new RuntimeException("posição inválida: " + posicao);
        }
        return lista.elemento(comprimento() - 1 - posicao);
    }

    public Object remover() {
        if (vazia()) {
            throw new RuntimeException("pilha vazia");
        }
        return lista.remover(0);
    }

    public boolean vazia() {
        return lista.vazia();
    }

    // mostra da base ate o topo
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < comprimento() - 1; i++) {
            sb.append(elemento(i));
            sb.append(",");
        }
        if (comprimento() > 0) {
            sb.append(elemento(comprimento() - 1));
        }
        sb.append("]");
        return sb.toString();
    }
}