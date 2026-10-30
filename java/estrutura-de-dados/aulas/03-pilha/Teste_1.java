import ed.armseq.PilhaInt;

public class Teste_1 {
    public final static int MAX = 10;

    public static void main(String[] a) {
        PilhaInt pilha = new PilhaInt(MAX);

        for(int i = 0; i<MAX; i++) {
            pilha.adicionar(i);
            System.out.println(i + "-->" + pilha);
        }

        while(!pilha.vazia()) {
            int v = pilha.remover();
            System.out.println(v + "<--" + pilha);
        }

    }
}
