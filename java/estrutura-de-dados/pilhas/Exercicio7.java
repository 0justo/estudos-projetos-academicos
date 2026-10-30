import java.util.Scanner;

public class Exercicio7 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Pilha pilha = new Pilha(10);
        Pilha auxiliar = new Pilha(10);

        for (int i = 0; i < 10; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            pilha.adicionar(valor);
        }

        while (!pilha.vazia()) {
            auxiliar.adicionar(pilha.remover());
        }

        System.out.println("Valores na ordem de entrada:");
        while (!auxiliar.vazia()) {
            System.out.println((int) auxiliar.remover());
        }
    }
}
