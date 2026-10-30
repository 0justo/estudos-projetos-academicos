#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int c;
	do
	{
		printf ("Quantas cidades têm na estrada?: "); scanf ("%d",&c);
		c=c*2-1;
	}while (c<2);
	int v[c], i, nc=1;
	for (i=0; i<c; i=i+2)
	{
		printf ("Qual a posição da cidade %d?: ", nc); scanf ("%d",&v[i]);
		nc++;
	}
	for (i=1; i<c; i=i+2)
	{
		v[i] = v[i+1] - v [i-1];
	}
	for (i=0; i<c; i++) printf ("v[%d]: %d.\t",i,v[i]);
}
