#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float ib,nh;
	printf ("Informe o investimento básico por cidadão (em reais): "); scanf("%f",&ib);
	printf ("\nInforme o número de habitantes da cidade: "); scanf("%f",&nh);
	if (nh>10000) ib=ib*1.2;
	else ib=ib*1.15;
	printf ("\nO valor base de investimento ideal é: %.2f reais por cidadão",ib);
}
