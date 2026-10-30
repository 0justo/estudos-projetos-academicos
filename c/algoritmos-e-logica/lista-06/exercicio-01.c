#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int c,d,n1,rn1,n2,n=0;
	printf ("Digite o divisor: "); scanf ("%d", &d);
	printf ("\nDigite o limite inferior: "); scanf ("%d",&n1);
	printf ("\nDigite o limite superior: "); scanf ("%d",&n2);
	c=n1;
	if (d==0) printf ("\nO divisor não pode ser 0!");
	else
	{
		while (c<n2)
		{
			rn1=n1%d;
			if (rn1==0 && n1!=0)
				{
				printf ("%d\t",n1);
				n=n+1;
				}
				n1=n1+1;
				c=c+1;
		}
	printf ("\nO total de números divisíveis é: %d!",n);
	}
}
