#include <stdio.h>

int main()
{
	float An,Aa,Ia,Im,Id;
	printf("Informe seu ano de nascimento: \n");
	scanf("%f",&An);
	printf("Informe o ano atual: \n");
	scanf("%f",&Aa);
	Ia=Aa-An;
	Im=Ia*12;
	Id=Ia*365.25;
	printf("Sua idade em anos é %f \n",Ia);
	printf("Sua idade em meses é %f \n",Im);
	printf("Sua idade em dias é %f \n",Id);
}
