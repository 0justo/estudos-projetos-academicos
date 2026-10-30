#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int Qc,Dc,Td;
	printf ("Informe a quantidade de cadernos:"); scanf ("%d",&Qc);
	printf ("\nInforme a quantidade de divisões:"); scanf ("%d",&Dc);
	Td=Qc*Dc;
	printf ("\nVocê tem %d divisões.",Td);
}
