#include <stdio.h>

main()
{
	int cod;
	printf ("Informe o codigo do livro: ");
	scanf ("%d",&cod);
	if (cod<100 || cod>300) printf ("\nLivro de ficcao.");
	else printf ("\nLivro biografico.");
}
