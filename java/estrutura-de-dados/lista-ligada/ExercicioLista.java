import java.util.Scanner;

//Exercicio 3 (Listas Ligadas Simples):
//Escreva um programa que armazene em
//uma lista valores inteiros dados pelo
//usuário. Depois da entrada, exibir os
//valores, remover todos os elementos
//pares existentes e exibir novamente a
//lista.

public class ExercicioLista {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ListaLigada lista = new ListaLigada();

        System.out.print("Quantos valores deseja digitar? ");
        int qtd = sc.nextInt();

        for (int i = 0; i < qtd; i++) {
            System.out.print("Digite um valor: ");
            int valor = sc.nextInt();
            lista.adicionar(valor);
        }

        System.out.println("Lista digitada: " + lista);

        int i = 0;
        while (i < lista.comprimento()) {
            int valor = (int) lista.elemento(i);
            if (valor % 2 == 0) {
                lista.remover(i);
            } else {
                i++;
            }
        }

        System.out.println("Lista sem pares: " + lista);
    }
}