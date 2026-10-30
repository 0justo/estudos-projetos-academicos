public class Horario {
    private int hora, minuto;

    public void setHora(int hora) {
        if (hora<0 || hora>23) {
            throw new RuntimeException(
                    "hora inválida: " + hora);
        }
        this.hora = hora;
    }

    public void setMinuto(int minuto) {
        if (minuto<0 || minuto>59) {
            throw new RuntimeException(
                    "minuto inválido: " + minuto);
        }
        this.minuto = minuto;
    }

    public int getHora() {
        return hora;
    }

    public int setMinuto() {
        return minuto;
    }

    @Override
    public String toString() {
        return String.format("%02d:%02d", hora, minuto);
    }
}
