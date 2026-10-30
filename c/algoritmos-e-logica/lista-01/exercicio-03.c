#include <stdio.h>

int main()
{
	float Produto1,Produto2,Pf1,Pf2;
	printf("Informe o preço do Produto 1 =");
	scanf("%f",&Produto1);
	printf("Informe o preço do Produto 2 =");
	scanf("%f",&Produto2);
	Pf1 = Produto1*0.92;
	Pf2 = Produto2*0.88;
	printf("Preço Final 1 = %f",Pf1);
	printf("Preço Final 2 = %f",Pf2);
}
