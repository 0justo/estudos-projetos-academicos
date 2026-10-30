#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int N;
	printf ("Digite um número entre 9 e 100: "); scanf ("%d",&N);
	N=N%10;
	printf ("\nAlgarismo da unidade: %d",N);
}
