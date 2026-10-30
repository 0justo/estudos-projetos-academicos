#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int b,e,p,i=2;
	printf ("Digite a base: "); scanf ("%d",&b);
	printf ("Digite o expoente: "); scanf ("%d",&e);
	p=b;
	while (i<=e)
	{
		p=p*b;
		i++;
	}
	printf ("\n%d.",p);
}
