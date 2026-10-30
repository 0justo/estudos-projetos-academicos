#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float Sal;
	printf ("Informe seu salário: "); scanf ("%f",&Sal);
	if (Sal>5000)
	{
		Sal=Sal*1.12;
		printf ("\nSeu novo salário é: %f",Sal);
	}
	else
	{
		Sal=Sal*1.15;
		printf ("\nSeu novo salário é: %f",Sal);
	}
}
