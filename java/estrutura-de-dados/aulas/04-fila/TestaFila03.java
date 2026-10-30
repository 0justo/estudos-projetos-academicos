public class TestaFila03 {
    public static int MAX = 10;

    public static void main(String[] a) {
        Fila fila = new Fila(MAX);
        System.out.println(fila);

        for (int i = 0; i < MAX; i++) {
            fila.adicionar(MAX - i);
            System.out.println(fila + " <-- " + (MAX - i));
        }

        while (!fila.vazia()) {
            int v = (Integer) fila.remover();
            System.out.println(v + " <-- " + fila);
        }
    }
}
