import java.util.Scanner;

public class Exercicio6 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Pilha positivos = new Pilha(10);
        Pilha negativos = new Pilha(10);

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
            System.out.println((int) positivos.remover());
        }

        System.out.println("Valores negativos:");
        while (!negativos.vazia()) {
            System.out.println((int) negativos.remover());
        }
    }
}
