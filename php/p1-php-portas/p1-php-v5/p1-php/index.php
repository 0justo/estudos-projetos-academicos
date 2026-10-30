<?php
$titulo = 'Curso de Análise e Desenvolvimento de Sistemas';
$pagina = 'home';
include 'includes/header.php';
?>

<section class="hero" data-hero>
  <div class="wrap hero-grade">
    <div class="hero-texto">
      <p class="kicker">ADS &middot; Fatec Jundiaí</p>
      <h1 class="hero-titulo"><span>Qual <mark>dev</mark></span> <span>você é?</span></h1>
      <p class="lead"><?= count($perguntas) ?> perguntas sobre games, celular e redes sociais. No final você descobre qual área de tecnologia combina com você e o que estudar para chegar lá.</p>
      <p class="acoes">
        <a class="btn btn-principal" href="quiz.php">Fazer o quiz</a>
        <a class="btn" href="#curso">Ver o curso</a>
      </p>
    </div>
    <div class="hero-visual">
      <figure class="hero-foto">
        <img src="assets/img/campus-dia.jpg" width="800" height="445" alt="Prédio de tijolinhos da Fatec Jundiaí, com jardim na frente">
      </figure>
      <ul class="adesivos" aria-hidden="true">
        <?php foreach ($areas as $chave => $a): ?>
          <li class="adesivo a-<?= htmlspecialchars($chave) ?>"><span class="emo"><?= htmlspecialchars($a['emoji']) ?></span><?= htmlspecialchars($a['nome']) ?></li>
        <?php endforeach; ?>
      </ul>
    </div>
  </div>
</section>

<section class="bloco bloco-fundo" id="curso">
  <div class="wrap curso-topo">
    <div class="curso-texto">
      <p class="kicker">O curso</p>
      <h2>Faculdade pública e <mark>gratuita</mark>, aqui em Jundiaí</h2>
      <p class="texto">O curso de ADS acontece no campus da <?= htmlspecialchars($curso['bairro']) ?>, em <?= htmlspecialchars($curso['cidade']) ?>.</p>
      <p class="texto">O curso forma profissionais para analisar, projetar, documentar, testar e manter sistemas de informação. Quem se forma pode atuar em indústria, comércio, serviços, instituições financeiras, órgãos públicos ou no próprio negócio.</p>
    </div>
    <figure class="foto" data-parallax>
      <img src="assets/img/campus-fachada.jpg" width="620" height="420" alt="Fachada de tijolinhos do prédio da Fatec Jundiaí" loading="lazy">
      <span class="balao-foto"><span class="emo" aria-hidden="true">📍</span><?= htmlspecialchars($curso['bairro'] . ', ' . $curso['cidade']) ?></span>
    </figure>
  </div>

  <div class="wrap">
    <ul class="numeros">
      <?php foreach ($numeros as [$emoji, $rot, $grande, $texto]): ?>
        <li class="numero">
          <div class="numero-topo">
            <span class="emo" aria-hidden="true"><?= $emoji ?></span>
            <span class="numero-titulo"><?= htmlspecialchars($rot) ?></span>
          </div>
          <strong><?= htmlspecialchars($grande) ?></strong>
          <span class="numero-texto"><?= htmlspecialchars($texto) ?></span>
        </li>
      <?php endforeach; ?>
    </ul>

    <details class="ficha-completa">
      <summary>Mais dados do curso</summary>
      <dl class="ficha">
        <?php foreach ($ficha as $rotulo => $valor): ?>
          <div class="ficha-linha">
            <dt><?= htmlspecialchars($rotulo) ?></dt>
            <dd><?= htmlspecialchars($valor) ?></dd>
          </div>
        <?php endforeach; ?>
      </dl>
    </details>
  </div>
</section>

<section class="bloco" id="grade">
  <div class="wrap trilha" data-trilha>
    <div class="trilha-lado">
      <p class="kicker">Grade curricular</p>
      <h2>Semestre por semestre</h2>
      <p class="texto">Do primeiro código ao Trabalho de Graduação, conforme a matriz curricular do curso.</p>
    </div>

    <ol class="linha-tempo">
      <?php foreach ($grade as $i => $materias): $n = $i + 1; ?>
        <li>
          <h3><?= $n ?>º semestre</h3>
          <ul class="materias" aria-label="Matérias do <?= $n ?>º semestre">
            <?php foreach ($materias as $m): ?>
              <li><?= htmlspecialchars($m) ?></li>
            <?php endforeach; ?>
          </ul>
          <?php if (isset($grade_nota[$n])): ?>
            <p class="sem-nota"><?= htmlspecialchars($grade_nota[$n]) ?></p>
          <?php endif; ?>
        </li>
      <?php endforeach; ?>
    </ol>
  </div>
</section>

<section class="bloco bloco-fundo" id="areas">
  <div class="wrap">
    <p class="kicker">Depois do curso</p>
    <h2>As <?= count($areas) ?> áreas</h2>
    <p class="texto"><?= htmlspecialchars($txt_areas_intro) ?> <a href="areas.php">Veja o que cada uma faz</a> ou <a href="quiz.php">descubra a sua no quiz</a>.</p>
    <div class="grade-areas">
      <?php $n = 0; foreach ($areas as $chave => $a): $n++; ?>
        <article class="area a-<?= htmlspecialchars($chave) ?>">
          <?php if ($a['imagem'] !== ''): ?>
            <img class="area-img" src="<?= htmlspecialchars($a['imagem']) ?>" width="320" height="180" alt="Ilustração da área <?= htmlspecialchars($a['nome']) ?>" loading="lazy">
          <?php endif; ?>
          <div class="area-topo">
            <span class="emo emo-g" aria-hidden="true"><?= htmlspecialchars($a['emoji']) ?></span>
            <span class="area-num">0<?= $n ?></span>
          </div>
          <h3><?= htmlspecialchars($a['nome']) ?></h3>
          <p><?= htmlspecialchars($a['oque']) ?></p>
          <p class="area-links">
            <a href="areas.php#<?= htmlspecialchars($chave) ?>">Ver a área</a>
            <?php if (area_tem_jogo($chave)): ?>
              <a href="jogo.php?area=<?= htmlspecialchars($chave) ?>">🎮 Jogar</a>
            <?php endif; ?>
          </p>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php
$chamada_extra = '<a class="btn btn-claro" href="' . htmlspecialchars($link_vestibular) . '" target="_blank" rel="noopener">Ver o vestibular</a>';
include 'includes/chamada-quiz.php';
?>

<?php include 'includes/footer.php'; ?>
