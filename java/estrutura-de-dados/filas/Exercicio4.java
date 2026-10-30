import java.util.Scanner;

public class Exercicio4 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Fila filaNormal = new Fila(20);
        Fila filaPreferencial = new Fila(20);

        int contNormal = 0;
        int contPreferencial = 0;
        int opcao = -1;

        while (opcao != 0) {
            System.out.println("1 - Emitir senha normal");
            System.out.println("2 - Emitir senha preferencial");
            System.out.println("3 - Chamar senha");
            System.out.println("0 - Sair");
            System.out.print("Digite a opcao: ");
            opcao = sc.nextInt();

            if (opcao == 1) {
                contNormal = contNormal + 1;
                String senha = "N" + contNormal;
                filaNormal.adicionar(senha);
                System.out.println("Senha emitida: " + senha);
            }

            else if (opcao == 2) {
                contPreferencial = contPreferencial + 1;
                String senha = "P" + contPreferencial;
                filaPreferencial.adicionar(senha);
                System.out.println("Senha emitida: " + senha);
            }

            else if (opcao == 3) {
                if (!filaPreferencial.vazia()) {
                    System.out.println("Atendendo: " + filaPreferencial.remover());
                }
                else if (!filaNormal.vazia()) {
                    System.out.println("Atendendo: " + filaNormal.remover());
                }
                else {
                    System.out.println("Nao ha senhas para atender.");
                }
            }

            else if (opcao == 0) {
                System.out.println("Saindo do sistema.");
            }

            else {
                System.out.println("Opcao invalida.");
            }
        }
    }
}