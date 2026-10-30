import java.util.Scanner;

public class Exercicio5 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Pilha pilha = new Pilha(10);

        for (int i = 0; i < 10; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            pilha.adicionar(valor);
        }

        System.out.println("Valores armazenados:");
        while (!pilha.vazia()) {
            int valor = (int) pilha.remover();
            System.out.println(valor);
        }
    }
}
