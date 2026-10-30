#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float p,pf,dep;
	int i;
	char s, ra;
	printf ("Informe a idade: "); scanf ("%d",&i);
	printf ("\nInforme o número de dependentes: "); scanf ("%f",&dep);
	printf ("\nInforme o sexo (m/f): "); fflush (stdin); scanf ("%c",&s);
	printf ("\nDeseja resgate aéreo? (s/n): "); fflush (stdin); scanf ("%c",&ra);
	if (i>59)
	{
		if (s=='m' || ra=='s')
		{
			p=822.75*2;
			printf ("\nPlano 1.");
		}
		else
		{
			p=822.75*1.85;
			printf ("\nPlano 2.");
		}
	}
	else if (i>=30 && i<=59)
	{
		p=822.75*1.4;
		printf ("\nPlano 3.");
	}
	else 
	{
		p=822.75*1.2;
		printf ("\nPlano 4.");
	}
	if (ra=='s') pf=p+(400*dep)+150;
	else pf=p+(400*dep);
	printf ("\nPreço final = R$%.2f",pf);
}
