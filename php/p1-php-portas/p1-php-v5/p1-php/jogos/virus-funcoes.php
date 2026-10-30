<?php
// Funções compartilhadas do jogo O Corta-Vírus (Infra & Segurança).
// Usadas por jogo-infra.php (textos), reiniciar-virus.php (agenda secreta),
// estado-virus.php (o que está aparecendo agora) e verificar-virus.php (cliques).

require_once __DIR__ . '/comum.php';

const JV_TEMPO  = 10;    // cada nível dura exatamente 10 segundos
const JV_PASTAS_MAX = 9; // maior número de pastas (nível 5); cada nível usa as suas
const JV_REDE   = 0.4;   // tolerância para o clique atravessar a rede depois que o vírus some
const JV_FOLGA  = 2;     // folga para a rede no fim do jogo

// 5 níveis. pastas = quantas pastas aparecem no painel, visivel = segundos que o vírus fica na tela,
// pausa = intervalo entre vírus (ms), seq = posições previsíveis (0,1,2,0,1,2...), max = máximo de
// vírus ao mesmo tempo e dupla = chance de cada vírus extra, falso = chance de aparecer um falso
// alarme, taxa = fração das ameaças que precisa ser isolada para passar, tempo = segundos perdidos
// a cada clique errado. Quanto mais pastas, mais difícil achar o vírus a tempo.
const JV_NIVEIS = [
    1 => ['nome' => 'Ameaça previsível',   'pastas' => 3, 'visivel' => 1.2,  'pausa' => [500, 800], 'seq' => true,  'max' => 1, 'dupla' => 0.0, 'falso' => 0.0, 'taxa' => 0.6,  'tempo' => 0],
    2 => ['nome' => 'Posições aleatórias', 'pastas' => 4, 'visivel' => 1.0,  'pausa' => [400, 700], 'seq' => false, 'max' => 2, 'dupla' => 0.15, 'falso' => 0.15, 'taxa' => 0.65, 'tempo' => 0.5],
    3 => ['nome' => 'Ataque veloz',        'pastas' => 6, 'visivel' => 0.85, 'pausa' => [300, 550], 'seq' => false, 'max' => 2, 'dupla' => 0.35, 'falso' => 0.3,  'taxa' => 0.65, 'tempo' => 0.75],
    4 => ['nome' => 'Ameaça dupla',        'pastas' => 8, 'visivel' => 0.75, 'pausa' => [250, 500], 'seq' => false, 'max' => 2, 'dupla' => 0.5,  'falso' => 0.5,  'taxa' => 0.65, 'tempo' => 1.0],
    5 => ['nome' => 'Firewall total',      'pastas' => 9, 'visivel' => 0.65, 'pausa' => [200, 450], 'seq' => false, 'max' => 3, 'dupla' => 0.45, 'falso' => 0.5,  'taxa' => 0.6,  'tempo' => 1.0],
];

const JV_TITULOS = ['Estagiário de Infra', 'Aprendiz de Redes', 'Analista de Segurança', 'Guardião do Firewall'];

// Agenda secreta do nível: cada evento tem o segundo em que começa, as pastas com vírus de
// verdade (pasta => já isolado?) e, às vezes, uma pasta com falso alarme.
function jv_gerar_agenda($nivel)
{
    $c = JV_NIVEIS[$nivel];
    $agenda = [];
    $t = 0.4 + random_int(0, 300) / 1000;   // o primeiro vem logo no começo
    $k = 0;
    while ($t + $c['visivel'] <= JV_TEMPO) {
        if ($c['seq']) {
            $reais = [$k % $c['pastas']];
        } else {
            $pastas = range(0, $c['pastas'] - 1);
            shuffle($pastas);
            $qtd = 1;
            while ($qtd < $c['max'] && random_int(1, 100) <= $c['dupla'] * 100) {
                $qtd++;
            }
            $reais = array_slice($pastas, 0, $qtd);
        }
        $falso = null;
        $livres = array_values(array_diff(range(0, $c['pastas'] - 1), $reais));
        if ($livres && random_int(1, 100) <= $c['falso'] * 100) {
            $falso = $livres[array_rand($livres)];
        }
        $agenda[] = [
            'inicio' => $t,
            'reais'  => array_fill_keys($reais, false),
            'falso'  => $falso,
        ];
        $t += $c['visivel'] + random_int($c['pausa'][0], $c['pausa'][1]) / 1000;
        $k++;
    }
    return $agenda;
}

function jv_total(array $agenda)
{
    $n = 0;
    foreach ($agenda as $ev) $n += count($ev['reais']);
    return $n;
}

function jv_bloqueados(array $agenda)
{
    $n = 0;
    foreach ($agenda as $ev) $n += count(array_filter($ev['reais']));
    return $n;
}

function jv_duracao(array $e)
{
    return JV_TEMPO - $e['perdido'];
}
