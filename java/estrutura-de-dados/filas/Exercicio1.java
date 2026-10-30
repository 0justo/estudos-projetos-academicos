import java.util.Scanner;

public class Exercicio1 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        FilaInt fila = new FilaInt(10);

        for (int i = 0; i < 10; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            fila.adicionar(valor);
        }

        System.out.println("Valores armazenados:");
        while (!fila.vazia()) {
            System.out.println(fila.remover());
        }
    }
}