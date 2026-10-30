#include <stdio.h>

main ()
{
	float pf,a,f;
	printf ("Informe a quantidade total de aulas: "); scanf ("%f",&a);
	printf ("Informe a quantidade de faltas: "); scanf ("%f",&f);
	pf = (f/a)*100;
	printf ("\nTaxa de faltas: %.2f por cento",pf);
	if (pf>0.25) printf ("\nReprovado por falta.");
	else printf ("\nAprovado");
}
