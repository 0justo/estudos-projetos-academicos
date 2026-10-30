#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int n, i=10,t;
	printf ("Digite um número inteiro: "); scanf ("%d", &n);
	if (n<0) printf ("O número precisa ser inteiro.");
	else
	{
		while (i>=1)
		{
			t=n*i;
			printf ("\n%d*%d = %d.",n,i,t);
			i--;
		}
	}
}
