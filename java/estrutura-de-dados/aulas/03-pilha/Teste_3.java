import ed.armseq.Pilha;

public class Teste_3 {
    public static void main(String[] a) {
        Pilha pilha = new Pilha();
        // Impressão implícita do toString da classe Pilha
        System.out.println(pilha);

        pilha.adicionar(75);
        System.out.println(pilha);

        pilha.adicionar("Peter");
        System.out.println(pilha);

        Object o1 = pilha.remover(); // obtém "Peter"
        System.out.println(pilha);
        String s = (String) o1; // Coerção para String
        System.out.println(s);

        Object o2 = pilha.remover(); // obtém 75
        System.out.println(pilha);
        int i = (Integer) o2; // Coerção para inteiro
        System.out.println(i);
    }
}
