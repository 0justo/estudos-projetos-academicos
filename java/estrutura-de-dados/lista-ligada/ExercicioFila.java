import java.util.Scanner;

//Exercicio 5 (Pilha, Fila e Lista Ligada), refazendo o exercicio 4 com Fila:
//Escreva um programa que armazene em
//uma Fila uma quantidade de valores
//reais e aleatórios definida pelo usuário.
//Depois de fornecida tal quantidade
//entrada, preencher a Fila, exibir os
//valores, remover os elementos um a um e
//exibir novamente a Fila.

public class ExercicioFila {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Fila fila = new Fila();

        System.out.print("Quantos valores deseja gerar? ");
        int qtd = sc.nextInt();

        for (int i = 0; i < qtd; i++) {
            double valor = Math.round(Math.random() * 10000) / 100.0;
            fila.adicionar(valor);
        }

        System.out.println("Fila: " + fila);

        while (!fila.vazia()) {
            double valor = (double) fila.remover();
            System.out.println("Removido: " + valor);
        }

        System.out.println("Fila: " + fila);
    }
}