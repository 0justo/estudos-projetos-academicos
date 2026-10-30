#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float a,b,c;
	printf ("Segmentos a,b,c: "); scanf ("%f%f%f",&a,&b,&c);
	if (a>=b+c || b>=a+c || c>=a+b) printf ("\nMedidas não formam um triângulo.");
	else if (a==b && b==c) printf ("\nO triângulo é esquilátero.");
		else if (a==b || b==c || a==c) printf ("\nO triângulo é isósceles.");
			else printf ("\nO triângulo é escaleno.");
}
