#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float Dt,Vh,He,Vhe,Sal;
	printf ("Informe quantos dias trabalhou: "); scanf ("%f",&Dt);
	printf ("\nValor da hora: "); scanf ("%f",&Vh);
	printf ("\nNúmero de horas extras: "); scanf ("%f",&He);
	Vhe=Vh*1.2;
	Sal=(Dt*8*Vh)+(He*Vhe);
	printf ("\nSeu salário será: %f",Sal);
}
