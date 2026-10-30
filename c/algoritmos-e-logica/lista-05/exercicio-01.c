#include <stdio.h>

main()
{
	float p;
	int cod;
	printf ("Informe o preco do produto: ");
	scanf ("%f",&p);
	printf ("\nInforme o codigo do produto: ");
	scanf ("%d",&cod);
	if (p>100 && cod>50 && cod<70) p=p*0.9;
	else p=p*0.95;
	printf ("\nPreco final = %.2f.",p);
}
