#include <stdio.h>

int main()
{
	float Dn,Mn,An,Da,Ma,Aa,Id,D,Ad,Md;
	printf("Seu dia de nascimento: \n");
	scanf("%f",&Dn);
	printf("Seu mês de nascimento: \n");
	scanf("%f",&Mn);	
	printf("Seu ano de nascimento: \n");
	scanf("%f",&An);	
	printf("Dia atual: \n");
	scanf("%f",&Da);	
	printf("Mês atual: \n");
	scanf("%f",&Ma);
	printf("Ano atual: \n");
	scanf("%f",&Aa);
	if (Dn>Da){
		Ma= Ma-1;
		D=D+30.44;
	}
	D=Da-Dn;
	Md=(Ma-Mn)*30.44;
	Ad=(Aa-An)*365,25;
	Id=D+Md+Ad;
	printf("Sua idade em dias é %f",Id);
}
