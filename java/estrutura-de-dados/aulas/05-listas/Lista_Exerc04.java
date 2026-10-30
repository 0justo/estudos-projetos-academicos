import java.util.Scanner;

public class Lista_Exerc04 {
    private static final int MAX = 2;

    public static void main(String[] a) {
        Lista alunos = new Lista(MAX);
        Scanner sc = new Scanner(System.in);

        for (int i = 0; i < MAX; i++) {
            Aluno aluno = new Aluno();
            System.out.println("#" + (i+1) + "Nome? ");
            aluno.nome = sc.nextLine();
            System.out.println("#" + (i+1) + "Sobrenome? ");
            aluno.sobrenome = sc.nextLine();
            System.out.println("#" + (i+1) + "RA? ");
            aluno.RA = sc.nextLine();
            System.out.println("#" + (i+1) + "Curso? ");
            aluno.curso = sc.nextLine();
            alunos.adicionar(aluno);
        }
        System.out.println(alunos);
    }
}
