import java.util.Scanner;

public class Exercicio2 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        FilaInt positivos = new FilaInt(10);
        FilaInt negativos = new FilaInt(10);
        int cont = 0;
        while (cont < 10) {
            System.out.print("Digite um valor (0 para sair): ");
            int valor = sc.nextInt();
            if (valor == 0) {
                break;
            }
            if (valor > 0) {
                positivos.adicionar(valor);
            } else {
                negativos.adicionar(valor);
            }
            cont++;
        }

        System.out.println("Valores positivos:");
        while (!positivos.vazia()) {
            System.out.println(positivos.remover());
        }

        System.out.println("Valores negativos:");
        while (!negativos.vazia()) {
            System.out.println(negativos.remover());
        }
    }
}