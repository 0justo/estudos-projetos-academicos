<?php
// Página própria de cada jogo: jogo.php?area=front|back|dados|infra
// É o mesmo jogo que aparece no resultado do quiz, agora ligado à página das áreas.
session_start();
require_once __DIR__ . '/includes/dados.php';

$area = $_GET['area'] ?? '';
if (!is_string($area) || !isset($areas[$area]) || !area_tem_jogo($area)) {
    header('Location: areas.php');
    exit;
}
$perfil = $areas[$area];

$titulo = $perfil['jogo']['nome'];
$pagina = 'jogo';
include 'includes/header.php';
?>

<div class="wrap pagina a-<?= htmlspecialchars($area) ?>">
  <header class="pagina-cabeca">
    <p class="kicker">Jogo &middot; <?= htmlspecialchars($perfil['nome']) ?></p>
    <h1 class="h1-menor">Teste a área <mark><?= htmlspecialchars($perfil['nome']) ?></mark></h1>
    <p class="lead">Um joguinho rápido para sentir como é o dia a dia dessa área.</p>
  </header>

  <section class="jogo-secao a-<?= htmlspecialchars($area) ?>">
    <?php include __DIR__ . '/jogos/jogo-' . $area . '.php'; ?>
  </section>

  <p class="acoes">
    <a class="btn btn-principal" href="areas.php#<?= htmlspecialchars($area) ?>">Ver a área</a>
    <a class="btn" href="quiz.php">Fazer o quiz</a>
    <a class="btn" href="<?= htmlspecialchars($link_vestibular) ?>" target="_blank" rel="noopener">Vestibular Fatec</a>
  </p>
</div>

<?php include 'includes/footer.php'; ?>
