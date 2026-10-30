#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	int D;
	float P;
	printf ("Informe o dia do mês: "); scanf ("%d",&D);
	printf ("\nInforme o preço do produto: "); scanf ("%f",&P);
	if (D>15)
	{
		P=P*0.94;
		printf ("\nO preço com desconto é: %.2f",P);
	}
	else
	{
		P=P*0.92;
		printf ("\nO preço com desconto é: %.2f",P);
	}
}
