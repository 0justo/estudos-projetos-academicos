#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int n;
	printf ("Tamanho do vetor: "); scanf ("%d", &n);
	int v1[n], v2[n], c1=0, c2=n-1;
	for (c1; c1<n; c1++)
	{
		printf ("\nDigite o valor da posição %d: ", c1); scanf ("%d", &v1[c1]);
		v2[c2]=v1[c1];
		c2=c2-1;
	}
	c1=0;
	c2=0;
	for (c1; c1<n; c1++) printf ("%d\t",v1[c1]);
	printf ("\n");
	for (c2; c2<n; c2++) printf ("%d\t",v2[c2]);
}
