#include <stdio.h>

main ()
{
	float V, id;
	printf ("informe idade = "); scanf ("%f", &id);
	printf ("informe valor da compra = "); scanf ("%f", &V);
	if (id < 18) V = V * 0.95;
	else if (id < 31) V = V * 0.90;
		else if (id < 51) V = V * 0.85;
			else V = V * 0.80;
	printf ("\n valor com desconto = %f", V);
}
