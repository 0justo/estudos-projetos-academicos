#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int n;
	printf ("Digite um número inteiro: "); scanf ("%d",&n);
	n = n%2;
	if (n==0) printf ("\nNúmero par");
	else printf ("\nNúmero ímpar");
}
