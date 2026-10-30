import java.util.Scanner;

public class Exercicio3 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        PilhaInt pilha = new PilhaInt(12);
        PilhaInt auxiliar = new PilhaInt(12);

        for (int i = 0; i < 12; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            pilha.adicionar(valor);
        }

        while (!pilha.vazia()) {
            auxiliar.adicionar(pilha.remover());
        }

        System.out.println("Valores sem os pares:");
        while (!auxiliar.vazia()) {
            System.out.println(auxiliar.remover());
        }
    }
}
