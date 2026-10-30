public class Teste01 {
    public static void main(String[] args) {
        TADFracao f1 = new TADFracao();
        System.out.println("f1 = " + f1);
        f1.setNum(3);
        f1.setDen(7);
        TADFracao f2 = new TADFracao(5,10);
        System.out.println("f2 = " + f2);
        f2.setNum(4);
        f2.setDen(8);
        System.out.println("f1 = " + f1);
        System.out.println("f2 = " + f2);
    }
}
