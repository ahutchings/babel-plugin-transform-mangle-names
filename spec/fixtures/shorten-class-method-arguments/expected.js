class Gorilla {
  constructor(a, b) {
    this.name = a;
    this.jungle = b;
  }

  eat(c) {
    console.log(`just eating my ${ c } in the ${ this.jungle } jungle!`);
  }
}

const d = new Gorilla('Shabani', 'Congo');
d.eat('banana');
