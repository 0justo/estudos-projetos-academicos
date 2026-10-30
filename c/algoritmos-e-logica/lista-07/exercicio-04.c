#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int n;
	printf ("Digite o tamanho do vetor desejado: "); scanf ("%d",&n);
	int v[n], i, aux, auxr;
	for (i=0; i<n ; i++) 
	{
		printf ("Digite o valor do índice %d: ",i); scanf ("%d",&v[i]);
	}
	if (n%2==0)
	{

		for (i=0; i<n ; i=i+2)
		{
			aux = v[i];
			v[i] = v[n-1-i];
			v[n-1-i] = aux;
		}
	}
	else 
	{
		for (i=0; i<n/2; i++)
		{
			aux = v[i];
			v[i] = v[n-1-i];
			v[n-1-i] = aux;
		}
	}
	i=0;
	while (i<n)
	{
		printf ("v[%d]: %d.\t",i,v[i]);
		i++;
	}
}
