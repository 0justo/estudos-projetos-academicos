#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int n,i=1,c;
	printf ("Digite um número inteiro e positivo: "); scanf ("%d",&n);
	while (i<n)
	{
		if (n%i==0)
		{
			c++;
			i++;
		}
		else i++;
	}
	if (c==2 || c==1) printf ("\n%d é um número primo.",n);
	else printf ("\n%d não é um número primo.",n);
	printf ("%d",c);
}
