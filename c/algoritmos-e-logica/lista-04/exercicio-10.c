#include <stdio.h>

main ()
{
	int a,ra,rac,raq;
	printf ("Digite o ano desejado: "); scanf ("%d",&a);
	ra=a%4;
	rac=a%100;
	raq=a%400;
	if (raq==0) printf ("\nAno bissexto.");
	else if (rac==0) printf ("\nAno nao bissexto");
	else if (ra==0) printf ("\nAno bissexto.");
	else printf ("\nAno nao bissexto.");
}
