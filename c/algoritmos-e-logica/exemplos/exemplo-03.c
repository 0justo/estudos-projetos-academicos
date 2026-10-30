#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float a,b,c,delta,x1,x2,rdelta;
	printf ("Informe o termo 'a' da função de segundo grau: "); scanf ("%f",&a);
	printf ("Informe o termo 'b' da função de segundo grau: "); scanf ("%f",&b);
	printf ("Informe o termo 'c' da função de segundo grau: "); scanf ("%f",&c);
	if (a==0) 
	{
		printf("\nNão existem raízes reais para a função descrita");
		return 0;
	}
	delta=(b*b)-4*a*c;
	rdelta=1;
	while(rdelta*rdelta<delta)
	{
		rdelta++;
	}
	if (delta>0)
	{
		x1=(-b+rdelta)/(2*a);
		x2=(-b-rdelta)/(2*a);
		printf ("\nAs raízes da função são: %f,%f.",x1,x2);
	}
	else if (delta==0)
	{
		x1=-b/(2*a);
		printf("\nA raiz da função é (dupla): %f",x1);
	}
	else printf ("\nNão existem raízes reais para a função.");
}
