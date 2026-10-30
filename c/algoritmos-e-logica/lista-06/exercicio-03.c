#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float p,pt=0,pm; int i=1;
	while (i<=100)
	{
		printf ("Digite o valor do produto: "); scanf ("%f",&p);
		if (p>150)
		{
			p=p*0.95;
			pt=pt+p;
		}
		else pt=pt+p;
		i++;
	}
	pm=pt/100;
	printf ("\nO preço médio dos produtos é %.2f.",pm);
}
