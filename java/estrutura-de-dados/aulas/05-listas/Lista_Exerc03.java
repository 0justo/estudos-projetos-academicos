import java.util.Scanner;

public class Lista_Exerc03 {
    private static final int MAX = 12;

    public static void main(String[] a) {
        Lista inteiros = new Lista(MAX);
        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < MAX; i++) {
            System.out.println("#" + (i+1) + "Número? ");
            int aux = sc.nextInt();
            inteiros.adicionar(aux);
        }
        System.out.println(inteiros);
        for (int i = inteiros.comprimento() -1 ; i >= 0; i--) {
            if ((int)inteiros.elemento(i) % 2 == 0) {
                System.out.println(inteiros.remover(i)
                        + " removido da posição " + i);
            }
        }
        System.out.println(inteiros);
    }
}
