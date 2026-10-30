#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int a1, a2;
	printf ("Digite o ano 1: "); scanf ("%d",&a1);
	printf ("Digite o ano 2: "); scanf ("%d",&a2);
	if (a1>a2) printf ("O ano 2 precisa ser maior.");
	else
	{
		while (a1<=a2)
		{
			if (a1%400 == 0)
			{ 
			printf ("\n%d é um ano bissexto!",a1);
			a1++;
			}
			else if (a1%100==0) a1++;
				else if (a1%4==0)
				{
				printf ("\n%d é um ano bissexto!",a1);
				a1++;
				}
					else a1++;
		}
	}
}
