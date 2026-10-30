#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int a,b,c;
	printf ("Digite o menor número: "); scanf ("%d",&a);
	printf ("Digite o maior número: "); scanf ("%d",&b);
	while (b%a!=0)
	{
		c=a;
		a=b%a;
		b=c;
	}
	printf ("O MDC entre os números informados é: %d.",a);
}
