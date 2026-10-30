</main>
<footer class="rodape">
  <div class="wrap rodape-in">
    <img src="assets/img/logo-fatec-jundiai.png" alt="Fatec Jundiaí, Deputado Ary Fossen" width="411" height="247">
    <div>
      <p><strong><?= htmlspecialchars($curso['nome']) ?></strong><br>
      Fatec <?= htmlspecialchars($curso['cidade']) ?>, <?= htmlspecialchars($curso['endereco']) ?></p>
      <p><a href="<?= $link_curso ?>" target="_blank" rel="noopener">Página oficial do curso</a>
         &nbsp;|&nbsp;
         <a href="<?= $link_vestibular ?>" target="_blank" rel="noopener">Vestibular Fatec</a></p>
      <p class="pequeno">Projeto acadêmico, não é o site oficial da Fatec. Informações do portal da Fatec Jundiaí e da matriz curricular do curso.</p>
    </div>
  </div>
</footer>
<script src="assets/site.js?v=<?= @filemtime(__DIR__ . '/../assets/site.js') ?: 1 ?>" defer></script>
</body>
</html>
