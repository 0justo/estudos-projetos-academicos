#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int v[15], i;
	for (i=0; i<15; i++)
	{
		printf ("Digite um número inteiro: "); scanf ("%d",&v[i]);
	}
	i=0;
	while (i<14)
	{
		printf ("%d\t",v[i]);
		i++;
	}
	printf ("\n");
	while (i>=0)
	{
		printf ("%d\t",v[i]);
		i--;
	}
}
