#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int N,UND,DEZ,NI;
	printf ("Digite um número entre 9 e 100: "); scanf ("%d",&N);
	UND=N%10;
	DEZ=N/10;
	NI=UND*10+DEZ;
	printf ("Número invertido: %d",NI);
}
