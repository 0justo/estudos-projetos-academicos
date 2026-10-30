#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int i;
	printf ("Digite sua idade: "); scanf ("%d",&i);
	if (i>=18) printf ("\nVocê é maior de idade!");
	else printf ("\nVocê é menor de idade!");
}
