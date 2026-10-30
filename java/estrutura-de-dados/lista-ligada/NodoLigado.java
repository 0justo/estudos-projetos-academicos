public class NodoLigado {
    public Object dado;
    public NodoLigado prox;

    public NodoLigado() {
    }

    public NodoLigado(Object d) {
        dado = d;
    }

    public NodoLigado(Object d, NodoLigado p) {
        dado = d;
        prox = p;
    }
}