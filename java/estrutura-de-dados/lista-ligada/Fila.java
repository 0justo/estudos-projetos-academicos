public class Fila {
    private ListaLigada lista;

    public Fila() {
        lista = new ListaLigada();
    }

    public void adicionar(Object elem) {
        lista.adicionar(elem);
    }

    public Object remover() {
        if (vazia()) {
            throw new RuntimeException("Fila vazia.");
        }
        return lista.remover(0);
    }

    public Object elemento(int pos) {
        if (pos < 0 || pos >= comprimento()) {
            throw new RuntimeException("Posição inválida: " + pos);
        }
        return lista.elemento(pos);
    }

    public int comprimento() {
        return lista.comprimento();
    }

    public boolean vazia() {
        return lista.vazia();
    }

    @Override
    public String toString() {
        StringBuilder res = new StringBuilder("{ ");
        for (int i = 0; i < comprimento() - 1; i++) {
            res.append(elemento(i));
            res.append(", ");
        }
        if (comprimento() > 0) {
            res.append(elemento(comprimento() - 1));
        }
        res.append(" }");
        return res.toString();
    }
}