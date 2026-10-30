#include <stdio.h>

int main()
{
    float Sa, Sf;
    printf("Digite seu salário atual=");
    scanf("%f",&Sa);
    Sf=(Sa-(Sa*0.15))+100;
    printf("Salário final = %f",Sf);
}
