module.exports = grammar({
  name: 'apl',
  rules: {
    source_file: $ => seq(
      repeat($.end_stmt),
      repeat(seq(
        $.expr,
        repeat1($.end_stmt),
      )),
    ),
    expr: $ => repeat1(choice(
      seq(
        $.lsquare,
        repeat($.semicolon),
        repeat(seq(
          $.expr,
          repeat1($.semicolon),
        )),
        $.rsquare
      ),
      seq($.lparen, $.expr, $.rparen),
      $.primitive,
      $.identifier,
      $.character_vector,
      $.number,
      $.defn,
      $.parameter,
      $.zilde,
      $.system,
    )),
    defn: $ => seq(
      $.lbrace,
      repeat($.end_stmt),
      repeat(seq(
        $.expr,
        optional(seq($.colon, $.expr)),
        repeat1($.end_stmt),
      )),
      $.rbrace,
    ),
    lparen:           $ => '(',
    rparen:           $ => ')',
    lbrace:           $ => '{',
    rbrace:           $ => '}',
    lsquare:          $ => '[',
    rsquare:          $ => ']',
    colon:            $ => ':',
    semicolon:        $ => ';',
    primitive:        $ => /←|\+|-|×|÷|\*|⍟|⌹|○|!|\?|\||⌈|⌊|⊥|⊤|⊣|⊢|=|≠|≤|<|>|≥|≡|≢|∨|∧|⍲|⍱|↑|↓|⊂|⊃|⊆|⌷|⍋|⍒|⍳|⍸|∊|⍷|∪|∩|~|\/|\\|⌿|⍀|,|⍪|⍴|⌽|⊖|⍉|¨|⍨|⍣|\.|∘|⍤|⍥|@|⍠|⌸|⌺|⌶|⍎|⍕/,
    identifier:       $ => /[a-zA-Z_∆][a-zA-Z_∆1-9]*/, // TODO: make correct
    system:           $ => /⍞|⎕|⎕(CT|DCT|DIV|FR|IO|ML|PP|RL|AI|AN|CLEAR|CY|DL|LOAD|OFF|PATH|SAVE|TS|A|D|NULL|C|CMD|CSV|DR|DT|FMT|JSON|MAP|NA|R|S|SH|UCS|USING|VFI|XML|AT|CR|ED|EX|FX|LOCK|MONITOR|OR|NR|PROFILE|REFS|STOP|TRACE|VR|BASE|CLASS|CS|DF|FIX|INSTANCES|NEW|NS|SRC|THIS|ARBIN|ARBOUT|RTL|FAPPEND|FAVAIL|FCHK|FCOPY|FCREATE|FDROP|FERASE|FHIST|FHOLD|FLIB|FNAMES|FNUMS|FPROPS|FRDAC|FRDCI|FREAD|FRENAME|FREPLACE|FRESIZE|FSIZE|FSTAC|FSTIE|FTIE|FUNTIE|MKDIR|NAPPEND|NCOPY|NCREATE|NDELETE|NERASE|NEXISTS|NGET|NINFO|NLOCK|NMOVE|NNAMES|NNUMS|NPARTS|NPUT|NREAD|NRENAME|NREPLACE|NRESIZE|NSIZE|NTIE|NUNTIE|NXLATE|TALLOC|TCNUMS|TID|TKILL|TNAME|TNUMS|TSYNC|TGET|TPOOL|TPUT|TREQ|DM|DMX|EM|EN|EXCEPTION|SIGNAL|TRAP|LC|LX|NC|NL|NSI|RSI|SI|SHADOW|SIZE|STACK|STATE|WA|WSID|XSI|SCV|SVO|SVQ|SVR|SVS|DQ|EXPORT|NQ|WC|WG|WN|WS|WX|Á|AV|AVU|KL|PFKEY|SD|SM|SR|OPT|TC|XT)/i,
    zilde:            $ => /⍬/,
    parameter:        $ => /⍺⍺|⍵⍵|⍺|⍵/,
    inner_quote:      $ => /''/,
    character_vector: $ => seq("'", repeat(choice($.inner_quote, /[^']/)), "'"),
    number:           $ => /¯?[0-9]+/,
    end_stmt:         $ => choice(/⋄|\n/, seq($.comment, '\n')),
    comment:          $ => /⍝[^\n]*/,
  },
})
