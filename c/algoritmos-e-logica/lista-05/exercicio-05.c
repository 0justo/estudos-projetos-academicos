#include <stdio.h>
#include <locale.h>

main()
{
	setlocale (LC_ALL,"portuguese");
	float n1,n2,m,mf,a,f;
	printf ("Informe a primeira nota: "); scanf ("%f",&n1);
	printf ("\nInforme a segunda nota: "); scanf ("%f",&n2);
	printf ("\nQuantidade total de aulas: "); scanf ("%f",&a);
	printf ("\nQuantidade de faltas: "); scanf ("%f",&f);
	m=(n1+n2)/2;
	mf=(a-f)/a*100;
	if (m>=7 && mf>=75) printf ("\nAluno aprovado.\nMédia = %.2f.\nFrequência = %.2f%%.",m,mf);
	else if (m<7 && m>=3 && mf>=75) printf ("\nAluno fará exame.\nMédia = %.2f.\nFrequência = %.2f%%.",m,mf);
	else if (m<3 || mf<75) printf ("\nAluno reprovado.\nMédia = %.2f.\nFrequência = %.2f%%.",m,mf);
}
