#include <stdio.h>
#include <locale.h>
#include <math.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float n;
	int ni;
	printf ("Digite um número inteiro: "); scanf ("%f",&n);
	if (n<0) n=n*(-1);
	else
	{
		n=sqrt(n);
		ni=n;
		n=n-ni;
		if (n==0) printf ("\nEsse número é um quadrado perfeito!");
		else printf ("\nEsse número não é um quadrado perfeito!");
	}
}
