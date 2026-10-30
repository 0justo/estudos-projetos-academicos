public class Data {
    private int ano, mes, dia;

    private final int maxDias[] = { 31,28,31,30,31,30,31,31,30,31,30,31 };

    public Data(int dia, int mes, int ano) {
        setAno(ano);
        setMes(mes);
        setDia(dia);
    }

    public void setAno(int ano) {
        if (ano<2000 || ano>2100) {
            throw new RuntimeException("ano inválido: " + ano);
        }
        // validIn(ano, 2000, 2100, "ano inválido");
        this.ano = ano;
    }

    public void setMes(int mes) {
        if (mes<1 || mes>12) {
            throw new RuntimeException("mês inválido: " + mes);
        }
        // validIn(mes, 1, 12, "mês inválido");
        this.mes = mes;
    }

    public int diasMes(int mes) {
        if (mes<1 || mes>12) {
            throw new RuntimeException("mês inválido: " + dia);
        }
        // validIn(mes, 1, 12, "mês inválido");
        int max = maxDias[mes-1];
        if (mes==2 && bissexto()) max++;
        return max;
    }

    protected void validIn(int value, int min, int max, String msg) {
        if (value<min || value>max) {
            throw new RuntimeException(msg + ": " + value);
        }
    }

    public boolean bissexto() {
        return (ano%4==0 && (!(ano%100==0) || ano%400==0));
    }

    public void setDia(int dia) {
        if (dia<1 || dia>diasMes(mes)) {
            throw new RuntimeException("dia inválido: " + dia);
        }
        // validIn(dia, 1, diasMes(mes), "dia inválido");
        this.dia = dia;
    }

    public int getAno() {
        return ano;
    }
    public int getMes() {
        return mes;
    }
    public int getDia() {
        return dia;
    }

    @Override
    public String toString() {
        return String.format("%02d/%02d/%d", dia, mes, ano);
    }
}
