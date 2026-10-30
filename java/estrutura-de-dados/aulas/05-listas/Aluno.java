public class Aluno {
    public String nome;
    public String sobrenome;
    public String RA;
    public String curso;

    @Override
    public String toString() {
        return nome + " " + sobrenome + "|" + RA + "," + curso;
    }
}
