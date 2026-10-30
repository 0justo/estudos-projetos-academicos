#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	const int t=10; int i,j; srand (time(NULL)); int aux;
	int v[t];
	printf ("Vetor original: \n");
	for (i=0; i<t; i++)
	{
		v[i] = rand()%1000; printf ("%d\t", v[i]);
	}
	for (i=t-1; i>=1; i--)
	{
		for (j=0; j<i; j++)
		{
			if (v[i]>v[i+1])
			{
				aux = v[i];
				v[i] = v[i+1];
				v[i+1] = aux;
			}
		}
	}
	printf ("\nVetor ordenado: \n");
	for (i=0; i<t; i++) printf ("%d\t", v[i]);
	printf ("\n");
}
