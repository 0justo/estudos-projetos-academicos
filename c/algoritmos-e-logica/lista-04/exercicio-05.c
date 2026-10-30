#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL, "portuguese");
	int c;
	float p;
	printf ("Informe o código do livro: "); scanf ("%d",&c);
	if (c<30)
	{
		p=80*0.94;
		printf ("\nLivro do gênero: Suspense.\nO valor é: %.2f.",p);
	}
	else if (c<46)
	{
		p=80*0.92;
		printf ("\nLivro do gênero: Terror.\nO valor é: %.2f.",p);
	}
	else if (c<61)
	{
		p=80*0.88;
		printf("\nLivro do gênero: Biografia.\nO valor é: %.2f",p);
	}
	else
	{
		p=80*0.85;
		printf ("\nLivro do gênero: Didático.\nO valor é: %.2f",p);
	}
}
