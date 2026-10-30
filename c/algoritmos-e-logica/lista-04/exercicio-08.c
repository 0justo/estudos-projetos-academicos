#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int n1,n2,n3;
	printf ("Informe o primeiro número: "); scanf ("%d",&n1);
	printf ("Informe o segundo número: "); scanf ("%d",&n2);
	printf ("Informe o terceiro número: "); scanf ("%d",&n3);
	if (n1>n2 && n1>n3) printf ("\nO primeiro número (%d) é o maior.",n1);
	else if (n2>n1 && n2>n3) printf ("\nO segundo número (%d) é o maior.",n2);
	else if (n3>n1 && n3>n2) printf ("\nO terceiro número (%d) é o maior.",n3);
	}
