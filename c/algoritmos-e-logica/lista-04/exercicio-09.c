#include <stdio.h>

main ()
{
	float n1,n2;
	int o;
	printf ("\nDigite o primeiro numero: "); scanf ("%f",&n1);
	printf ("\nDigite o segundo numero: "); scanf ("%f",&n2);
	printf ("\nEscolha uma operacao: \n1-adicao; \n2-subtracao; \n3-multiplicacao; \n4-divisao \n\n"); scanf ("%d",&o);
	if (o==1) n1=n1+n2;
	else if (o==2) n1=n1-n2;
	else if (o==3) n1=n1*n2;
	else if (o==4) n1=n1/n2;
	printf ("\nO resultado da operacao e: %.2f",n1);
}
