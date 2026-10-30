#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int N1,N2,N3,aux;
	printf ("Digite um número inteiro: "); scanf ("%d",&N1);
	printf ("\nDigite um número inteiro: "); scanf ("%d",&N2);
	printf ("\nDigite um número inteiro: "); scanf ("%d",&N3);
	if (N1>N2 && N2>N3)
	{
		aux=N1;
		N1=N3;
		N3=aux;
	}
	if (N1>N3 && N3>N2)
	{
		aux=N1;
		N1=N2;
		N2=N3;
		N3=aux;
	}
	if (N2>N3 && N3>N1)
	{
		aux=N2;
		N2=N3;
		N3=aux;
	}
	if (N2>N1 && N1>N3)
	{
		aux=N1;
		N1=N3;
		N3=N2;
		N2=aux;
	}
	if (N3>N1 && N1>N2)
	{
		aux=N1;
		N1=N2;
		N2=aux;
	}
	printf ("%d, %d, %d",N1,N2,N3);
}
