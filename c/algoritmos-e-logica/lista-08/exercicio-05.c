#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int n; srand (time(NULL));
	do
	{
		printf ("\nDigite a dimensão: "); scanf ("%d",&n);
	}while (n<=1);
	int m[n][n], i, j;
	for (i=0; i<n; i++)
	{
		printf ("\n");
		for (j=0; j<=i; j++)
		{
			m[i][j] = rand ()%100;
			printf ("%d\t", m[i][j]);
		}
	}
}
