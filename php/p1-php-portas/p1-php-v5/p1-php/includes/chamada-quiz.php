<?php
// Bloco "Fazer o quiz" que fecha as páginas. Um só texto e uma só moldura para o site inteiro.
// Opcional, definido antes do include: $chamada_extra (HTML de um 2º botão) e
// $chamada_foto = ['src' => ..., 'alt' => ...] para trocar a foto (senão vale a foto da página).
$chamada_extra = $chamada_extra ?? '';

// Uma foto do campus para cada página, em rodízio, sempre na mesma moldura.
$fotos_chamada = [
    'home'        => ['assets/img/campus-noite.jpg',   'Vista aérea do campus da Fatec Jundiaí à noite, com o prédio iluminado'],
    'areas'       => ['assets/img/campus-fachada.jpg', 'Fachada de tijolinhos do prédio da Fatec Jundiaí'],
    'tecnologias' => ['assets/img/campus-dia.jpg',     'Prédio de tijolinhos da Fatec Jundiaí, com jardim na frente'],
    'integrantes' => ['assets/img/campus-noite.jpg',   'Vista aérea do campus da Fatec Jundiaí à noite, com o prédio iluminado'],
];
$padrao = $fotos_chamada[$pagina ?? ''] ?? $fotos_chamada['home'];
$chamada_foto = $chamada_foto ?? ['src' => $padrao[0], 'alt' => $padrao[1]];
$tam = @getimagesize(__DIR__ . '/../' . $chamada_foto['src']) ?: [800, 534];
?>
<section class="chamada">
  <div class="wrap chamada-grade">
    <div>
      <p class="kicker kicker-claro">Quiz</p>
      <h2>Qual área combina <mark>com você</mark>?</h2>
      <p class="acoes">
        <a class="btn btn-principal" href="quiz.php">Fazer o quiz</a>
        <?= $chamada_extra ?>
      </p>
    </div>
    <figure class="chamada-foto">
      <img src="<?= htmlspecialchars($chamada_foto['src']) ?>" width="<?= (int) $tam[0] ?>" height="<?= (int) $tam[1] ?>" alt="<?= htmlspecialchars($chamada_foto['alt']) ?>" loading="lazy">
    </figure>
  </div>
</section>
