#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float GanhoD,GastoD,Lucro;
	printf ("\nDigite seus ganhos diários:"); scanf ("%f",&GanhoD);
	printf ("\nDigite seus gastos diários:"); scanf ("%f",&GastoD);
	GastoD=GastoD*5;
	GanhoD=GanhoD*5;
	Lucro = (GanhoD-GastoD)*5;
	printf ("\nSeu lucro semanal foi: %f", Lucro);
}
