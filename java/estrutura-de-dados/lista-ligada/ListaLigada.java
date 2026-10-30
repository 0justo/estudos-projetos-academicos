public class ListaLigada {
    private NodoLigado inicio;
    private NodoLigado fim;
    private int nNodos = 0;

    public void adicionar(Object elem) {
        NodoLigado novo = new NodoLigado(elem);
        if (vazia()) {
            inicio = novo;
        } else {
            fim.prox = novo;
        }
        fim = novo;
        nNodos++;
    }

    public void inserir(int pos, Object elem) {
        if (pos < 0 || pos > nNodos) {
            throw new RuntimeException("Posição inválida: " + pos);
        }
        if (pos == nNodos) {
            adicionar(elem);
            return;
        }
        if (pos == 0) {
            inicio = new NodoLigado(elem, inicio);
        } else {
            NodoLigado ant = nodo(pos - 1);
            ant.prox = new NodoLigado(elem, ant.prox);
        }
        nNodos++;
    }

    public Object remover(int pos) {
        if (pos < 0 || pos >= nNodos) {
            throw new RuntimeException("Posição inválida: " + pos);
        }
        NodoLigado aux;
        if (pos == 0) {
            aux = inicio;
            inicio = aux.prox;
            if (inicio == null) {
                fim = null;
            }
        } else {
            NodoLigado ant = nodo(pos - 1);
            aux = ant.prox;
            ant.prox = aux.prox;
            if (aux == fim) {
                fim = ant;
            }
        }
        aux.prox = null;
        nNodos--;
        return aux.dado;
    }

    public Object elemento(int pos) {
        if (pos < 0 || pos >= nNodos) {
            throw new RuntimeException("Posição inválida: " + pos);
        }
        return nodo(pos).dado;
    }

    public int comprimento() {
        return nNodos;
    }

    public boolean vazia() {
        return nNodos == 0;
    }

    // percorre a lista ate o nodo da posicao pedida
    private NodoLigado nodo(int pos) {
        NodoLigado aux = inicio;
        for (int i = 0; i < pos; i++) {
            aux = aux.prox;
        }
        return aux;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder("[");
        NodoLigado aux = inicio;
        while (aux != null) {
            sb.append(aux.dado);
            if (aux.prox != null) {
                sb.append(",");
            }
            aux = aux.prox;
        }
        sb.append("]");
        return sb.toString();
    }
}