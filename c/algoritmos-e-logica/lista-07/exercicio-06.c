#include <stdio.h>
#include <stdlib.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	const int d = 7;
	float p, vq[d], vv[d];
	char dias[8] = {'d', 's', 't', 'q', 'q', 's', 's'};
	int i;
	printf ("Informe o preço do produto: "); scanf ("%f", &p);
	for (i=0; i<d; i++)
	{
		printf ("\nDigite a quantidade de vendas do dia : "); scanf ("%f", vq[i]); 
	}
	for (i=0; i<d; i++)	vv[i]= p*vq[i];
	for (i=0; i<d; i++) printf ("O valor de vendas em %s foi = %f!", dias[i], vv[i]);
}
