#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL, "portuguese");
	float N1,N2,M;
	printf ("Insira a 1ª nota: "); scanf ("%f",&N1);
	printf ("\nInsira a 2ª nota: "); scanf ("%f",&N2);
	M=(N1+N2)/2;
	printf ("\nMédia= %.2f",M);
	if (M>=6) printf ("\nAprovado");
	else if (M<3) printf ("\nReprovado");
	else printf ("\nAluno fará exame.");
	
}
