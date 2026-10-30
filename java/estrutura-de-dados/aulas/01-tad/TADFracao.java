public class TADFracao {
    private int num, den;
    public int getNum() { return num; }
    public void setNum(int num) {
        this.num = num;
    }
    public int getDen() { return den; }
    public void setDen(int den) {
        if (den <= 0) {
            throw new RuntimeException("denominador inválido: "
                + den);
        }
        this.den = den;
    }
    public TADFracao(int num, int den) {
        setNum(num);
        setDen(den);
    }
    public TADFracao() {
        this(1,1);
    }
    public String toString() {
        return num + "/" + den;
    }
}
