module.exports = grammar({
  name: 'APL',
  rules: {
    source_file: $ => $.expr,
    expr:        $ => repeat1(choice(
      $.primitive,
      $.identifier,
      $.character_vector,
      seq('(', $.expr, ')')
    )),
    primitive:        $ => /←|\+|-|×|÷|\*|⍟|⌹|○|!|\?|\||⌈|⌊|⊥|⊤|⊣|⊢|=|≠|≤|<|>|≥|≡|≢|∨|∧|⍲|⍱|↑|↓|⊂|⊃|⊆|⌷|⍋|⍒|⍳|⍸|∊|⍷|∪|∩|~|\/|\\|⌿|⍀|,|⍪|⍴|⌽|⊖|⍉|¨|⍨|⍣|\.|∘|⍤|⍥|@|⍞|⎕|⍠|⌸|⌺|⌶|⍎|⍕/,
    identifier:       $ => /[a-zA-Z_∆][a-zA-Z_∆1-9]*/, // TODO: make correct
    character_vector: $ => /'([^']|'')*'/,
  },
})
