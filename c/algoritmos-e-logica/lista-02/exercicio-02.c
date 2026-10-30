#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float N1,N2,M;
	printf ("Digite sua primeira nota:"); scanf ("%f",&N1);
	printf ("\nDigite sua segunda nota:"); scanf ("%f",&N2);
	M=N1*0.4+N2*0.6;
	printf ("\nSua média é: %.2f",M);
}
