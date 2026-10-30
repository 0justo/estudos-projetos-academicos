#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale(LC_ALL,"portuguese");
	int p, s;
	float pr;
	printf("\n As opções do Cardapio são:\n1-Peixe\n2-Carne Bovina\n3-Frango\n4-Vegetariano");
	printf("\n Digite a opção do cardápio = ");
	scanf("%d", &p);
	printf("\n O cliente opta por sobremesa ? \n0-Não\n1-Sim \n=");
	scanf("%d", &s);
	pr = 100;
	if (p==1)
	{
		printf("\n Você escolheu Peixe."); pr=pr*1.1;
	}
	else if (p==2)
	{
		printf("\n Você escolheu Carne bovina."); pr=pr*1.2;
	}
	else if (p==3)
	{
		printf ("\n Você escolheu Frango."); pr=pr*1.15;
	}
	else if (p==4)
	{
		printf ("\n Você escolheu Vegetariano."); pr=pr*1.05;
	}
	else 
	{
		printf ("\n Você optou pelo prato do dia."); pr=pr;
	}
	if (s==0)
	{
		pr=pr; 
		printf ("\nO cliente não pediu sobremesa.");
	}
	else
	{
		pr=pr*1.05;
		printf ("\nO cliente pediu sobremesa.");
	}
	printf("\n O valor final fica em = %.2f",pr);
}
