public class TesteLista01 {
    public static void main(String[] a) {
        Lista lista = new Lista(10);
        System.out.println(lista);
        for(int i = 0; i < lista.capacidade(); i++) {
            lista.adicionar(i);
            System.out.println(lista);
        }
        while(!lista.vazia()) {
            lista.remover(0);
            System.out.println(lista);
        }
        while(!lista.cheia()) {
            lista.inserir(0, String.format("%.2f", 10*Math.random()));
            System.out.println(lista);
        }
        while(!lista.vazia()) {
            int pos = (int)(Math.random() * lista.comprimento());
            Object aux = lista.remover(pos);
            System.out.println(lista + "-->" + aux + "(pos:" + pos + ")");
        }
   }
}
