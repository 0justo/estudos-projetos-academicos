import java.util.Scanner;

public class Exercicio8 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Pilha pilha = new Pilha(15);

        for (int i = 0; i < 15; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            pilha.adicionar(valor);
        }

        Pilha multiplos3 = new Pilha(15);
        Pilha restantes = new Pilha(15);

        while (!pilha.vazia()) {
            int valor = (int) pilha.remover();
            if (valor % 3 == 0) {
                multiplos3.adicionar(valor);
            } else if (valor % 2 == 0) {

            } else {
                restantes.adicionar(valor);
            }
        }

        System.out.println("Múltiplos de 3:");
        while (!multiplos3.vazia()) {
            System.out.println((int) multiplos3.remover());
        }

        System.out.println("Demais valores:");
        while (!restantes.vazia()) {
            System.out.println((int) restantes.remover());
        }
    }
}
