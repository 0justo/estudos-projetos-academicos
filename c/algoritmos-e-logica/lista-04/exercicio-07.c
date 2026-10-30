#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int n1,n2;
	printf ("Informe o primeiro número: "); scanf ("%d",&n1);
	printf ("Informe o segundo número: "); scanf ("%d",&n2);
	if (n1>n2) printf ("\nO  primeiro número (%d) é maior que o segundo número (%d).",n1,n2);
	else if (n2>n1) printf ("\nO segundo número (%d) é maior que o primeiro número (%d).",n2,n1);
	else printf ("\nOs números são iguais.");
	}
