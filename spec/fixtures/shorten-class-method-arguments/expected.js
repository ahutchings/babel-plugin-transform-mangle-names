class Gorilla {
  constructor(a, b) {
    this.name = a;
    this.jungle = b;
  }

  eat(a) {
    console.log(`just eating my ${ a } in the ${ this.jungle } jungle!`);
  }
}

const a = new Gorilla('Shabani', 'Congo');
a.eat('banana');
