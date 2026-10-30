import java.util.Scanner;

public class Lista_Exerc02 {
    private static final int MAX = 10;

    public static void main(String[] a) {
        Lista num_Pos = new Lista(MAX);
        Lista num_Neg = new Lista(MAX);
        Scanner sc = new Scanner(System.in);
        double numero = 0;
        int i = 1;
        do {
            System.out.println("#" + i + " Número? ");
            numero = sc.nextDouble();
            i++;
            if (numero > 0) num_Pos.adicionar(numero);
            else if (numero < 0) num_Neg.adicionar(numero);
        } while (numero != 0 && i < MAX);

        System.out.println("Positivos: "
                + num_Pos + ":" + num_Pos.comprimento());
        System.out.println("Negativos: "
                + num_Neg + ":" + num_Neg.comprimento());
    }
}
