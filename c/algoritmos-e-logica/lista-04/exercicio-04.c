#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int l;
	printf ("Informe a quantidade de lados do polígono: "); scanf ("%d",&l);
	if (l<4) printf ("\nO objeto não é um polígono.");
	else if (l==4) printf ("\nO objeto é um quadrado.");
	else if (l==5) printf ("\nO objeto é um pentágono.");
	else if (l==6) printf ("\nO objeto é um hexágono.");
}
