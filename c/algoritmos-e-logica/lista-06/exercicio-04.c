#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int n, i=1,s=0;
	printf ("Digite um número: "); scanf ("%d",&n);
	if (n<0) printf ("O número deve ser positivo!");
	else
	{
		while (i<=n)
		{
			if (i%2==0) i++;
			else
			{
				s=s+i;
				i++;
			}
		}
		printf ("\nO somatório dos números ímpares no intervalo entre 1 e %d é = %d.",n,s);
	}
}
