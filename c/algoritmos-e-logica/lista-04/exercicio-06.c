#include <stdio.h>
#include <math.h>

main()
{
	float peso,altura,imc;
	
	printf("\nDigite o peso em KG: ");
	scanf("%f",&peso);
	
	printf("\nDigite a altura em metros: ");
	scanf("%f",&altura);
	imc = peso / (altura*altura);
	printf("\nIMC: %.2f",imc);
	if(imc<20)
	{
		printf("\nClassificacao: subnormal");
	}
	else if(imc>=20 && imc<25)
	{
		printf("\nClassificacao: Normal");
    }
	else if(imc>=25 && imc<30)
	{
    	printf("\nClassificacao: Sobrepeso");
	}
	else if(imc>=30 && imc<35)
	{
		printf("\nClassificacao: Obesidade leve");
	}
	else if(imc>=35 && imc<40)
	{
		printf("\nClassificacao: Obesidade moderada");
	}
	else
	{
		printf("\nClassificacao: Obesidade morbida");
	}
	
}
