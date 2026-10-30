import java.util.Scanner;

public class Lista_Exerc01 {
    private static final int MAX = 5;

    public static void main(String[] a) {
        Lista nomes = new Lista(MAX);
        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < MAX; i++) {
            System.out.println("#" + (i+1) + "Nome? ");
            String aux = sc.nextLine();
            nomes.adicionar(aux);
        }

        System.out.println(nomes);
    }
}
