#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int Ni;
	float N;
	printf ("Digite um número: "); scanf ("%f",&N);
	Ni=N;
	N=N-Ni;
	printf ("Parte decimal do número: %f",N);
}
