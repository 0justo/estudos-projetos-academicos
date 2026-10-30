<?php
$titulo = 'As 4 áreas';
$pagina = 'areas';
include 'includes/header.php';
// $areas vem de dados/areas.xml, lido com simplexml_load_file() em carregar_areas() (includes/dados.php).
?>

<div class="wrap pagina">
  <header class="pagina-cabeca">
    <p class="kicker">Áreas &middot; depois do curso</p>
    <h1 class="h1-menor">As <?= count($areas) ?> <mark>áreas</mark></h1>
    <p class="lead"><?= htmlspecialchars($txt_areas_intro) ?> Veja o que cada área faz, onde dá para trabalhar, quais matérias do curso preparam você para ela e teste um pouco dela no jogo.</p>
  </header>

  <?php if ($areas): ?>
    <div class="grade-areas">
      <?php $n = 0; foreach ($areas as $chave => $a): $n++; ?>
        <article class="area a-<?= htmlspecialchars($chave) ?>" id="<?= htmlspecialchars($chave) ?>">
          <?php if ($a['imagem'] !== ''): ?>
            <img class="area-img" src="<?= htmlspecialchars($a['imagem']) ?>" width="320" height="180" alt="Ilustração da área <?= htmlspecialchars($a['nome']) ?>" loading="lazy">
          <?php endif; ?>
          <div class="area-topo">
            <span class="emo emo-g" aria-hidden="true"><?= htmlspecialchars($a['emoji']) ?></span>
            <span class="area-num">0<?= $n ?></span>
          </div>
          <h2 class="area-nome"><?= htmlspecialchars($a['nome']) ?></h2>

          <div class="area-bloco">
            <h3 class="area-sub">O que é</h3>
            <p><?= htmlspecialchars($a['oque']) ?></p>
          </div>

          <div class="area-bloco">
            <h3 class="area-sub">Carreiras</h3>
            <ul class="tags" aria-label="Carreiras">
              <?php foreach ($a['carreiras'] as $c): ?>
                <li><?= htmlspecialchars($c) ?></li>
              <?php endforeach; ?>
            </ul>
          </div>

          <div class="area-bloco">
            <h3 class="area-sub">Matérias do curso</h3>
            <ul class="lista">
              <?php foreach ($a['materias'] as $m): ?>
                <li><?= htmlspecialchars($m) ?></li>
              <?php endforeach; ?>
            </ul>
          </div>

          <div class="area-bloco area-jogo">
            <?php if (area_tem_jogo($chave)): ?>
              <h3 class="area-sub">Jogo da área</h3>
              <p><strong><?= htmlspecialchars($a['emoji'] . ' ' . $a['jogo']['nome']) ?></strong><br><?= htmlspecialchars($a['jogo']['resumo']) ?></p>
            <?php endif; ?>
          </div>

          <p class="acoes area-acao">
            <?php if (area_tem_jogo($chave)): ?>
              <a class="btn btn-principal" href="jogo.php?area=<?= htmlspecialchars($chave) ?>">Jogar</a>
            <?php endif; ?>
          </p>
        </article>
      <?php endforeach; ?>
    </div>
  <?php endif; ?>
</div>

<?php
$chamada_extra = '<a class="btn btn-claro" href="' . htmlspecialchars($link_vestibular) . '" target="_blank" rel="noopener">Ver o vestibular</a>';
include 'includes/chamada-quiz.php';
?>

<?php include 'includes/footer.php'; ?>
