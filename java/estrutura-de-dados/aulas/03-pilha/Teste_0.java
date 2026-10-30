//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
import ed.armseq.PilhaInt;

void main() {
    PilhaInt pilha = new PilhaInt();
    System.out.println("Pilha:"
            + "\n\tcapacidade: " + pilha.capacidade()
            + "\n\tcomprimento: " + pilha.comprimento()
            + "\n\trepresentação textual: " + pilha.toString());
    pilha.adicionar(72);
    System.out.println("Pilha:"
            + "\n\tcapacidade: " + pilha.capacidade()
            + "\n\tcomprimento: " + pilha.comprimento()
            + "\n\trepresentação textual: " + pilha.toString());
    pilha.adicionar(127);
    pilha.adicionar(3);
    pilha.adicionar(14);
    System.out.println("Pilha:"
            + "\n\tcapacidade: " + pilha.capacidade()
            + "\n\tcomprimento: " + pilha.comprimento()
            + "\n\trepresentação textual: " + pilha.toString());
}

