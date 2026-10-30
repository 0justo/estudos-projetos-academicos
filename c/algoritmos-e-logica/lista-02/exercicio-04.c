#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float P1,P2;
	printf ("Quantidade da peça 1 produzida atualmente:"); scanf ("%f",&P1);
	printf ("\nQuantidade da peça 2 produzida atualmente:"); scanf ("%f",&P2);
	P1=P1*1.17;
	P2=P2*1.26;
	printf ("\nA nova quantidade a ser produzida da peça 1 é: %f",P1);
	printf ("\nA nova quantidade a ser produzida da peça 2 é: %f",P2);
}
