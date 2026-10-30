#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int a,b,c;
	printf ("Informe um número a: "); scanf ("%d",&a);
	printf ("Informe um número b: "); scanf ("%d",&b);
	c=a;
	a=b;
	b=c;
	printf ("Valor de a: %d \nvalor de b: %d",a,b);
}
