<?php
// Recebe a mistura RGB do jogador, compara com a cor-alvo da sessão (o jogador nunca
// recebe a cor secreta antes de enviar) e calcula a proximidade em %.
// Não há porcentagem mínima: quem envia dentro do tempo ganha pontos. Se o relógio da
// tela zerar (acao=encerrar) ou o envio chegar fora do tempo, a fase vale 0 pontos,
// a sequência zera e o jogo segue para a próxima fase (ou para o resultado, na última).

session_start();
require_once __DIR__ . '/cor-funcoes.php';

$e = jn_exigir_aberta('jogo_cor');
$n = JC_NIVEIS[$e['nivel']];

function jc_canal($v)
{
    return (is_string($v) && preg_match('/^\d{1,3}$/', $v) && (int) $v <= 255) ? (int) $v : null;
}
$dt = microtime(true) - $e['inicio'];
$esgotou = ($_POST['acao'] ?? '') === 'encerrar' || $dt > $n['tempo'] + JC_FOLGA;

$r = jc_canal($_POST['r'] ?? null);
$g = jc_canal($_POST['g'] ?? null);
$b = jc_canal($_POST['b'] ?? null);
if (($r === null || $g === null || $b === null) && !$esgotou) {
    jn_json(['erro' => 'Não entendemos a sua cor. Os valores precisam ser números de 0 a 255.'], 400);
}
$r = $r ?? 0; $g = $g ?? 0; $b = $b ?? 0;
$alvo = $e['alvo'];

// Distância euclidiana no cubo RGB, convertida em proximidade (0 a 1) e elevada ao cubo
// para punir erro: cor de outra família não pode aparecer como "boa".
$dist = sqrt(($alvo['r'] - $r) ** 2 + ($alvo['g'] - $g) ** 2 + ($alvo['b'] - $b) ** 2);
$prox = max(0, min(1, 1 - $dist / sqrt(3 * 255 ** 2)));
$pct  = max(0, min(100, (int) round(($prox ** 3) * 100)));

$venceu = !$esgotou;
if ($venceu) {
    $ganho = jn_pontos($e['nivel'], $pct / 100, 1 - $dt / $n['tempo'], $e['seq'] + 1);
    jn_fechar($e, true, $ganho, JC_TOTAL);
} else {
    // tempo esgotado: 0 pontos nesta fase, mas o jogo NÃO acaba (os pontos anteriores ficam)
    $ganho = 0;
    $e['aberta']   = false;
    $e['seq']      = 0;
    $e['liberado'] = $e['nivel'] < JC_TOTAL;
    $e['fim']      = $e['nivel'] >= JC_TOTAL;
}
$_SESSION['jogo_cor'] = $e;

jn_json(array_merge(jn_resumo($e, JC_TITULOS, JC_TOTAL), [
    'rodada_fim'     => true,
    'aprovado'       => $venceu,
    'tempo_esgotado' => $esgotou,
    'porcentagem'    => $pct,
    'ganho'          => $ganho,
    'alvo_hex'       => jc_hex($alvo),
    'sua_hex'        => sprintf('#%02X%02X%02X', $r, $g, $b),
]));
