#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float Lp,Ap,Ct,Lt,Qt;
	printf ("Qual a largura da parede?:"); scanf ("%f",&Lp);
	printf ("\nQual a altura da parede?:"); scanf ("%f",&Ap);
	printf ("\nQual comprimento do tijolo?:"); scanf ("%f",&Ct);
	printf ("\nQual a largura do tijolo?:"); scanf ("%f",&Lt);
	Qt=(Lp*Ap)/(Ct*Lt);
	printf ("\nA quantidade necessária de tijolos é: %f",Qt);
}
