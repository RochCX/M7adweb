export class Cursos {
    static cursosDisponibles = [
    {
        "codigo": "0001",
        "nombre": "HTML",
        "estado": true,
        "precio": "30000",
        "duracion":"1 mes",
        "descripcion": "curso html",
        "cupos": 10,
        "inscritos": 0,
        "img": "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png"
       },
       {
        "codigo": "0002",
        "nombre": "CSS",
        "estado": false,
        "precio": "20000",
        "duracion":"1 mes",
        "descripcion": "curso css",
        "cupos": 20,
        "inscritos": 0,
        "img": "https://lineadecodigo.com/wp-content/uploads/2014/04/css.png"
       },
       {
        "codigo": "0003",
        "nombre": "SASS",
        "estado": true,
        "precio": "40000",
        "duracion":"2 mes",
        "descripcion": "curso sass",
        "cupos": 30,
        "inscritos": 0,
        "img": "https://miro.medium.com/max/512/1*9U1toerFxB8aiFRreLxEUQ.png"
       },
       {
        "codigo": "0004",
        "nombre": "VUE",
        "estado": false,
        "precio": "50000",
        "duracion":"3 mes",
        "descripcion": "curso vue",
        "cupos": 15,
        "inscritos": 0,
        "img": "https://thumbs.gfycat.com/PinkPiercingBull-size_restricted.gif"
       },
    ];
  
      static getCursos() {
      return this.cursosDisponibles;
    }
  
  }