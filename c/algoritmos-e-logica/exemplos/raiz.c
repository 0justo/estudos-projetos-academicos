#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	float n,rn;
	printf ("informe um número"); scanf("%f",&n);
	rn=1;
	while (rn*rn < n){
		rn++;
	}
	printf ("a%f",rn);
}
