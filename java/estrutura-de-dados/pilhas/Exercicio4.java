import java.util.Scanner;

public class Exercicio4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        PilhaInt pilha = new PilhaInt(15);

        for (int i = 0; i < 15; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            pilha.adicionar(valor);
        }

        PilhaInt multiplos3 = new PilhaInt(15);
        PilhaInt restantes = new PilhaInt(15);

        while (!pilha.vazia()) {
            int valor = pilha.remover();
            if (valor % 3 == 0) {
                multiplos3.adicionar(valor);
            } else if (valor % 2 == 0) {

            } else {
                restantes.adicionar(valor);
            }
        }

        System.out.println("Múltiplos de 3:");
        while (!multiplos3.vazia()) {
            System.out.println(multiplos3.remover());
        }

        System.out.println("Demais valores:");
        while (!restantes.vazia()) {
            System.out.println(restantes.remover());
        }
    }
}
