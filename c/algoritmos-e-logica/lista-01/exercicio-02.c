#include <stdio.h>

int main()
{
	float N1,N2,N3,M;
	printf("Digite o valor da Nota 1=");
	scanf("%f",&N1);
	printf("Digite o valor da Nota 2=");
	scanf("%f",&N2);
	printf("Digite o valor da Nota 3=");
	scanf("%f",&N3);
	M = ((N1*0.2)+(N2*0.35)+(N3*0.45))/(0.2+0.35+0.45);
	printf("Média = %f",M);
}
