#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL, "portuguese");
	int x,i=1,id;
	float y, sa, sb, sc, sd, st;
	printf ("Digite o número de lugares: "); scanf ("%d",&x);
	printf ("Digite o valor da passagem: "); scanf ("%d",&y);
	while (i<=x)
	{
		printf ("Qual a idade do passageiro?: "); scanf ("%d",&id);
		if (id<7) sa=sa+y;
			else if (id<13) sb=sb+y*1.1;
				else if (id<18)	sc=sc+y*1.2;
					else sd=sd+y*1.3;
		i++;
	}
	st=sa+sb+sc+sd;
	printf ("\nA arrecadação total é: %.2f",st);
	printf ("\nA arrecadação entre menores de 7 anos é: %.2f",sa);
	printf ("\nA arrecadação entre 7 e 12 anos é: %.2f",sb);
	printf ("\nA arrecadação entre 12 e 17 anos é: %.2f",sc);
	printf ("\nA arrecadação entre maiores de 17 anos é: %.2f",sd);
}
