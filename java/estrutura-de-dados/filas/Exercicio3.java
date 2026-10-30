import java.util.Scanner;

public class Exercicio3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        FilaInt fila = new FilaInt(12);
        FilaInt sempares = new FilaInt(12);

        for (int i = 0; i < 12; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            if (valor%2 == 0) {
                fila.adicionar(valor);
            }
            else {
                fila.adicionar(valor);
                sempares.adicionar(valor);
            }
        }

        System.out.println("Fila digitada: " + fila);


        System.out.println("Fila sem pares: " + sempares);
    }
}