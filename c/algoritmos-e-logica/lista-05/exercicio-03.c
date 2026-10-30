#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float a,b,c,s;
	printf ("Insira os ângulos internos do triângulo: "); scanf ("%f%f%f",&a,&b,&c);
	s=a+b+c;
	if (s==180)
	{
		if (a==90 || b==90 || c==90) printf ("\nTriângulo retângulo.");
		else if (a>90 || b>90|| c>90) printf ("\nTriângulo obtusângulo.");
		else printf ("\nTriângulo acutângulo.");
	}
	else printf ("\nOs ângulos informados não formam um triângulo.");
}
