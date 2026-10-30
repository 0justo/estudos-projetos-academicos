#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	const int f=5;
	int i=0;
	float sal[f], m, st;
	for (i; i<f; i++)
	{
		printf ("Digite o salário %d: ",i+1); scanf ("%f",&sal[i]);
		st = st + sal[i];
	}	
	m = st/f;
	printf ("\nMédia salarial = %f.",m);
	for (i=0; i<f; i++)
	{
		if (m>5000) sal [i] = sal [i] * 1.1;
		else sal [i] = sal [i] * 1.15;
		printf ("\nSalário reajustado do funcionário %d = %f.", i+1, sal[i]);
	}
}
