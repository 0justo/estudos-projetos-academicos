#include <stdio.h>
#include <locale.h>

main ()
{
	setlocale (LC_ALL,"portuguese");
	int a=1,i=0,e=0,c;
	while (a<=10)
	{
		printf ("Código curso do aluno %d: ",a); scanf ("%d",&c); 
		if (c==1) i=i+500;
		else e=e+400;
		a=a+1;
	}
	printf ("\nArrecadação com inglês: %d",i);
	printf ("\nArrecadação com espanhol: %d",e);
}
