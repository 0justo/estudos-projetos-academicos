import java.util.Scanner;

//Exercicio 2 (Pilha, Fila e Lista Ligada):
//Escreva um programa que armazene
//até 20 strings (palavras) dadas pelo
//usuário, separando em duas Pilhas
//distintas as palavras no singular e
//plural (terminadas em s). A string
//"<fim>" finaliza a sequência. Exiba os
//valores das duas Pilhas após sua
//entrada.

public class ExercicioPilha {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Pilha singular = new Pilha();
        Pilha plural = new Pilha();

        int cont = 0;
        while (cont < 20) {
            System.out.print("Digite uma palavra (<fim> para sair): ");
            String palavra = sc.next();
            if (palavra.equals("<fim>")) {
                break;
            }
            if (palavra.endsWith("s")) {
                plural.adicionar(palavra);
            } else {
                singular.adicionar(palavra);
            }
            cont++;
        }

        System.out.println("Pilha singular: " + singular);
        System.out.println("Pilha plural: " + plural);
    }
}