CAMPO MINATO VERSIONE BASIC

//Una volta invocata la funzione che genera la griglia di gioco
//Si crea una funzione che generi un array di bombe con (array di elementi)
    //Si crea dentro funzione un array vuoto di bombe
    //Si parte con un ciclo for che va da 0 a 16 - 1
        //Si invoca una funzione che generei numero randomico da 0 alla lunghezza dei box gella giglia di gioco e si assegna ad una variabile Bomb
            //Se array di bombe include bomba 
                //L'indice del ciclo decresce di 1
            //Altrimenti si mette bomba nell'array di bombr
            //La funzione ritorna l'array di bombe
//Si crea una funzione Draw che prende 3 parametri (input, control list, grid array)
    //Se control list include input
        //Si cicla su tutta la control list attribuendo la classe 'bomba';
    //Altrimenti 
        //Si aggiunge a input di grid array la classe 'empty'
//Si crea funzione DrawScore che prende 2 parametri (score, elemento)
    //Si fa query selector di elemento
    //Si setta l'inner.HTML dell'elemento = score
//Si crea una funzione DisplayText che prende 3 parametri(conntainer di elementi  posizione stringa)
    //Si fa una query selector all su container di elementi e si assegna ad una variabile container
    //Si toglie classe active da container [posizione]
    //Se posizione = 2
        //Si setta posizione ad 1
    //Altrimenti posizione + 1
    //Si aggiunge classe active a container[posizione]
    //Si mette a container[posizione] innerhtml la stringa
//Si crea funzione remove listener che prende un array di elementi
    //Si cicla sull'array di bombe e si copia ogni nodo aggiungendolo ad un array
    //Si sostituice lista elementi con nuova lista elementi
//Si crea funzione game che prende 2 parametri (input e array di elementi)
    //Si crea array bombe richiamando funzione creabombe con array di elementi.length
    //Si crea variabile score = 0
    //Si crea variabile clickked = [];
    //Se input non incluso in array di bombe e in clicked
        //Si aggiunge a clicked
        //Si incrementa score di 1
    //Altrimenti
        //Se input incluso in array di bombe 
            //Si invoca funzione Display Text con posizione 1 e stringa sconfitta + score
            //Si invoca funzione remove listener con array di grid
        //Se giocatore vince 
            //Si invoca funzione Display Text con posizione 1 e stringa sconfitta + score
            //Si invoca funzione remove listener con array di grid
    //Si invoca funzione Draw (input, array bombe, boxes)
    //Si invoca funzione Draw score(score)