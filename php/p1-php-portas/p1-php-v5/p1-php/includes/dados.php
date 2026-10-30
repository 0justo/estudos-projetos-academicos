<?php
// Todo o conteúdo do site fica aqui. Para mudar um texto, mude aqui.

$link_vestibular = 'https://vestibular.fatec.sp.gov.br/';
$link_curso      = 'https://fatecjd.edu.br/site/analise-e-desenvolvimento-de-sistemas/';

// Fatos do curso: cada um é escrito UMA vez aqui e todas as páginas (ficha, destaques, rodapé,
// texto da home) montam suas frases a partir destes valores. Para mudar um número, mude só aqui.
$curso = [
    'nome'         => 'Tecnologia em Análise e Desenvolvimento de Sistemas',
    'modalidade'   => 'Tecnólogo, presencial',
    'anos'         => 3,
    'semestres'    => 6,
    'periodos'     => 'vespertino do 1º ao 4º semestre, noturno no 5º e no 6º',
    'aulas_h'      => 2400,
    'estagio_h'    => 240,
    'estagio_sem'  => '3º',
    'tg_h'         => 160,
    'tg_sem'       => '5º',
    'vagas_vest'   => 25,
    'vagas_provao' => 15,
    'coordenador'  => 'Prof. João José Ferreira de Aguiar',
    'rua'          => 'Av. União dos Ferroviários, 1760',
    'bairro'       => 'Ponte de Campinas',
    'cidade'       => 'Jundiaí',
    'uf'           => 'SP',
];
$curso['carga_h']  = $curso['aulas_h'] + $curso['estagio_h'] + $curso['tg_h'];
$curso['endereco'] = $curso['rua'] . ', ' . $curso['bairro'] . ', ' . $curso['cidade'] . '/' . $curso['uf'];

function fmt_horas($h)
{
    return number_format($h, 0, ',', '.') . ' h';
}

// Frase usada na home e na página das áreas (antes cada página tinha a sua versão).
$txt_areas_intro = 'ADS abre portas para caminhos bem diferentes.';

// Destaques do curso (index.php): [emoji, título, número grande, texto]. Ficam vermelhos ao passar o mouse.
$numeros = [
    ['🎓', 'Duração',               $curso['anos'] . ' anos',  $curso['semestres'] . ' semestres, presencial'],
    ['💸', 'Mensalidade',           'R$ 0',                    'a Fatec é uma faculdade pública'],
    ['🌤️', 'Períodos',              '2 turnos',                $curso['periodos']],
    ['🎟️', 'Vagas',                 $curso['vagas_vest'] . ' + ' . $curso['vagas_provao'], $curso['vagas_vest'] . ' pelo Vestibular Fatec e ' . $curso['vagas_provao'] . ' pelo Provão Paulista'],
    ['💼', 'Estágio',               fmt_horas($curso['estagio_h']), 'a partir do ' . $curso['estagio_sem'] . ' semestre'],
    ['📘', 'Trabalho de Graduação', fmt_horas($curso['tg_h']),      'a partir do ' . $curso['tg_sem'] . ' semestre'],
];

// Ficha completa (index.php): só o que os destaques acima NÃO dizem.
$ficha = [
    'Nome'        => $curso['nome'],
    'Modalidade'  => $curso['modalidade'],
    'Carga total' => fmt_horas($curso['aulas_h']) . ' de aula + ' . fmt_horas($curso['estagio_h'] + $curso['tg_h']) . ' de estágio e TG = ' . fmt_horas($curso['carga_h']),
    'Coordenador' => $curso['coordenador'],
    'Endereço'    => $curso['endereco'],
];

// Grade do curso, conforme a matriz curricular oficial (vespertino e noturno, 6 semestres).
// É a ÚNICA lista de matérias por semestre; a linha do tempo da home é montada daqui.
// As matérias citadas em dados/areas.xml e dados/tecnologias.json usam estes mesmos nomes.
$grade = [
    ['Programação em Microinformática', 'Algoritmos e Lógica de Programação', 'Arquitetura e Organização de Computadores', 'Sistemas de Informação', 'Administração Geral', 'Matemática Discreta', 'Comunicação e Expressão', 'Inglês I'],
    ['Engenharia de Software I', 'Linguagem de Programação', 'Laboratório de Hardware', 'Sistemas Operacionais I', 'Programação de Scripts', 'Contabilidade', 'Estatística Aplicada', 'Cálculo', 'Inglês II'],
    ['Engenharia de Software II', 'Interação Humano-Computador', 'Estruturas de Dados', 'Sistemas Operacionais II', 'Banco de Dados', 'Linguagem de Programação IV', 'Economia e Finanças', 'Programação Linear e Aplicações', 'Inglês III'],
    ['Engenharia de Software III', 'Programação Orientada a Objetos', 'Redes de Computadores', 'Segurança da Informação', 'Laboratório de Banco de Dados', 'Gestão de Projetos', 'Sociedade e Tecnologia', 'Inglês IV'],
    ['Laboratório de Engenharia de Software', 'Gestão de Equipes', 'Tópicos Especiais em Informática', 'Empreendedorismo', 'Metodologia da Pesquisa Científico-tecnológica', 'Inglês V'],
    ['Gestão e Governança de Tecnologia da Informação', 'Inteligência Artificial', 'Ética e Responsabilidade Profissional', 'Inglês VI'],
];
// Avisos que aparecem junto de alguns semestres (montados dos fatos do curso).
$grade_nota = [
    3 => 'O estágio já pode começar.',
    5 => 'Começa o Trabalho de Graduação.',
    6 => 'Reta final do TG.',
];
$semestres = [];
foreach ($grade as $i => $materias) {
    $n = $i + 1;
    $semestres[] = [$n . 'º semestre', implode(', ', $materias) . '.' . (isset($grade_nota[$n]) ? ' ' . $grade_nota[$n] : '')];
}

// Os 4 perfis do quiz. A única fonte é dados/areas.xml.
// A função monta o mesmo array de sempre: $areas['front']['nome'], ['materias'] etc.
// Se o XML não puder ser lido, devolve [] e o header mostra um aviso amigável.
function carregar_areas($arquivo)
{
    if (!is_file($arquivo)) {
        return [];
    }
    libxml_use_internal_errors(true);          // XML quebrado não vira warning na tela
    $xml = simplexml_load_file($arquivo);
    libxml_clear_errors();
    if ($xml === false) {
        return [];
    }

    $lista = [];
    foreach ($xml->area as $a) {
        $id = (string) $a['id'];
        if ($id === '') {
            continue;
        }
        $materias = [];
        foreach ($a->materias->materia as $m) {
            $materias[] = trim((string) $m);
        }
        $carreiras = [];
        foreach ($a->carreiras->carreira as $c) {
            $carreiras[] = trim((string) $c);
        }
        $lista[$id] = [
            'jogo'     => [
                'nome'   => trim((string) $a->jogo->nome),
                'resumo' => trim((string) $a->jogo->resumo),
            ],
            'oque'     => trim((string) $a->oque),
            'nome'     => trim((string) $a->nome),
            'emoji'    => trim((string) $a->emoji),
            'imagem'   => trim((string) $a->imagem),
            'resumo'   => trim((string) $a->resumo),
            'materias' => $materias,
            'carreiras'=> $carreiras,
        ];
    }
    return $lista;
}

// Só mostra link de jogo para a área se o arquivo do jogo existir em jogos/.
function area_tem_jogo($id)
{
    return preg_match('/^[a-z]+$/', (string) $id) && is_file(__DIR__ . '/../jogos/jogo-' . $id . '.php');
}

$areas = carregar_areas(__DIR__ . '/../dados/areas.xml');
$erro_areas = $areas ? '' : 'Não conseguimos carregar as áreas do curso agora. Avise alguém do grupo ou tente de novo em instantes.';

// Página de integrantes (integrantes.php). Foto opcional em assets/img/integrantes/<ra>.jpg
$integrantes = [
    ['nome' => 'Carlos Eduardo Moreira dos Santos', 'ra' => '1140482522015'],
    ['nome' => 'Gabriela de Moura Freitas',         'ra' => '1140482522041'],
    ['nome' => 'Giovana Pinheiro da Silva',         'ra' => '1140482522018'],
    ['nome' => 'Jéssica Guimarães dos Santos',      'ra' => '1140482522008'],
    ['nome' => 'Larissa Meneguello',                'ra' => '1140482522009'],
];
$disciplina = ['nome' => 'Linguagem de Programação 4', 'docente' => 'Luciana Pereira Baptista'];

// As 5 perguntas: situações do dia a dia de quem está no ensino médio.
// Ninguém precisa saber nada de tecnologia. Cada opção: [área, emoji, texto]
$perguntas = [
    [
        'emoji'  => '🎮',
        'titulo' => 'Seu grupo de amigos decidiu organizar um campeonato de videogame. Qual é o seu papel?',
        'opcoes' => [
            ['front', '🎨', 'Criar o cartaz, o logo e deixar tudo com cara de evento de verdade'],
            ['back',  '🧩', 'Inventar as regras e o sistema de pontos para tudo funcionar direitinho'],
            ['dados', '📊', 'Cuidar da tabela, do ranking e das estatísticas de cada jogador'],
            ['infra', '🛡️', 'Garantir que internet, som, cabos e consoles estejam funcionando'],
        ],
    ],
    [
        'emoji'  => '📱',
        'titulo' => 'Você ganhou um celular novo. A primeira coisa que faz é…',
        'opcoes' => [
            ['infra', '🛡️', 'Colocar senha, ativar a segurança e fazer o backup das fotos'],
            ['front', '🎨', 'Escolher papel de parede, organizar os ícones e deixar com a sua cara'],
            ['back',  '🧩', 'Fuçar em tudo para descobrir o que ele consegue fazer'],
            ['dados', '📊', 'Ver quanta bateria e quanto tempo de uso cada app gasta'],
        ],
    ],
    [
        'emoji'  => '✨',
        'titulo' => 'Seu app favorito lançou uma novidade. O que te dá mais curiosidade?',
        'opcoes' => [
            ['dados', '📊', 'Como ele sabe do que eu gosto e sugere sempre algo que eu curto?'],
            ['infra', '🛡️', 'Como ele aguenta milhões de pessoas usando ao mesmo tempo sem cair?'],
            ['front', '🎨', 'O visual novo: as telas, os botões, as animações'],
            ['back',  '🧩', 'Como será que fizeram essa função nova funcionar?'],
        ],
    ],
    [
        'emoji'  => '🎬',
        'titulo' => 'Você vai criar o seu próprio canal de vídeos. O que te anima mais?',
        'opcoes' => [
            ['back',  '🧩', 'Criar um robô que responde os comentários e posta sozinho'],
            ['dados', '📊', 'Ver os números: quem assiste, em que horário e o que bomba'],
            ['infra', '🛡️', 'Montar o setup e proteger a conta contra hackers'],
            ['front', '🎨', 'Editar os vídeos e criar a identidade visual do canal'],
        ],
    ],
    [
        'emoji'  => '🍿',
        'titulo' => 'Daqui a 10 anos vão fazer um filme sobre a sua carreira. Ele conta a história de quem…',
        'opcoes' => [
            ['front', '🎨', 'Criou um app que todo mundo ama usar'],
            ['dados', '📊', 'Descobriu algo nos dados que mudou uma decisão gigante'],
            ['back',  '🧩', 'Construiu um sistema enorme que nunca para de funcionar'],
            ['infra', '🛡️', 'Salvou uma empresa inteira de um ataque hacker'],
        ],
    ],
];
