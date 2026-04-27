### Seminaarityön loppuraportti

#### Johdanto

Kurssin lopputyöksi saimme valita omasta näkökulmasta kiinnostavan aiheen, josta teemme seminaarityön. Katsoin esimerkkiaiheita ja niistä algoritmit pomppasi heti sieltä esille. Päätin sparrata tekoälyn kanssa sopivaa aihetta. Lopputulokseksi tuli labyrintin generointi ja ratkaiseminen eri algoritmien avulla sekä niiden vertaaminen lopuksi.

Projektin tavoitteena on toteuttaa labyrintin generointi- ja ratkaisualgoritmeja TypeScriptillä. Labyrintti generoidaan kahdella eri algoritmilla ja ratkaistaan kolmella eri hakualgoritmilla. Tuloksia vertaillaan kompleksisuusanalyysin avulla. Projekti tehtiin TypeScriptillä ja visualisointi HTML Canvasilla. Tavoitteenani oli ymmärtää miten eri hakualgoritmit toimivat käytännössä ja miten ne eroavat toisistaan suorituskyvyltään. Myös ihan teoriana tutustuminen algoritmeihin oli tavoite.

#### Teknologiat

Projektin toteutin TypeScriptillä, joka tuo JavaScriptiin lisänä staattisen tyypityksen (Microsoft 2024). Tämä auttoi erityisesti tietorakenteiden määrittelyssä ja virheiden havaitsemisessa kehitysvaiheessa. Kehityspalvelimena toimii Vite, joka mahdollisti nopean kehityssyklin selaimessa. Labyrintin visualisointi toteutin HTML Canvasilla, joka piirtää labyrintin soluittain ruudukolle (Mozilla 2024). Algoritmien testaukseen ja kompleksisuusanalyysin datan keräämiseen käytin ts-nodea, jolla TypeScript-koodia pystyy ajamaan suoraan terminaalissa ilman erillistä käännösvaihetta.

#### Tietorakenteet

Labyrintti koostuu Cell-olioista jotka muodostavat 2D-taulukon (Cell[][]). Jokainen solu sisältää rivin ja sarakkeen (row, col), neljä seinää (top, right, bottom, left) boolean-arvoina sekä tilatiedot visited ja inMaze. Seinän arvo true tarkoittaa että seinä on pystyssä ja false että seinä on kaadettu eli solusta pääsee kulkemaan johonkin naapuri soluista. Labyrintti voidaan esittää graafina, jossa solut ovat solmuja ja seinättömät yhteydet naapureihin ovat kaaria (Wikipedia 2026). Generointialgoritmit muokkaavat seiniä luodessaan käytäviä ja ratkaisualgoritmit tarkastavat seinien tilaa päättäessään mihin suuntaan voi edetä (GeeksforGeeks 2025).

Apufunktiot on toteutettu maze.ts-tiedostoon. createCell luo yksittäisen solun oletusarvoilla, createMaze luo koko ruudukon, getNeighbors hakee solun naapurit reunatarkistuksella, removeWall kaataa seinän kahden vierekkäisen solun väliltä ja addEntryExit avaa sisäänkäynnin vasempaan yläkulmaan ja uloskäynnin oikeaan alakulmaan.

#### Generaatio algoritmit

Kun lähdin ideaa miettimään niin piti valita algoritmit, joiden avulla luodaan labyrintti. Kun googlailin asiaa, niin vastaan tuli Recursive Backtracking ja Prim's algorithm. Näsitä ei etukäteen ollut tietoa, joten valitsin ne niin sanotusti arvalla.

##### Recursive Backtracker

Recursive Backtracker on stack-pohjainen syvyyssuuntainen algoritmi. Se aloittaa yhdestä solusta, merkitsee sen käydyksi ja etenee satunnaiseen naapuriin kaataen seinän solun ja naapurin väliltä. Kun algoritmi päätyy soluun josta ei pääse eteenpäin, se perääntyy stackia pitkin edelliseen risteykseen ja kokeilee toista suuntaa. Tätä toistetaan kunnes kaikki solut on käyty. Algoritmi tuottaa pitkiä, mutkittelevia käytäviä ja luo täydellisen labyrintin, jossa on vain yksi reitti kahden pisteen välillä (GeeksforGeeks 2025).

##### Prim’s Algorithm

Prim's Algorithm on frontier-pohjainen generointialgoritmi. Se aloittaa yhdestä solusta ja lisää sen naapurit frontier-listaan. Jokaisella kierroksella listasta valitaan satunnainen solu ja yhdistetään se satunnaiseen jo labyrintissä olevaan naapuriin kaatamalla seinä niiden väliltä. Uuden solun naapurit lisätään frontier-listaan. Toisin kuin Recursive Backtracker, Prim's kasvattaa labyrinttiä useasta suunnasta yhtä aikaa, mikä tuottaa lyhyempiä ja haarautuvampia käytäviä sekä useita vaihtoehtoisia reittejä (Wikipedia 2026).

#### Ratkaisija algoritmit

##### DFS (Depth-First Search)

DFS eli syvyyssuuntainen haku käyttää stackia ja etenee yhteen suuntaan mahdollisimman pitkälle. Kun algoritmi päätyy umpikujaan, se perääntyy viime risteykseen ja kokeilee toista suuntaa. Naapuriin voi siirtyä vain jos seinää ei ole välissä eikä solussa ole vielä käyty. Polku rekonstruoidaan parent-kartasta, joka tallentaa jokaisen solun kohdalla mistä siihen tultiin. DFS ei takaa lyhintä polkua, mutta on yksinkertainen ja muistitehokas (GeeksforGeeks 2025).

##### BFS (Breadth-First Search)

BFS eli leveyssuuntainen haku käyttää jonoa (queue) stackin sijaan. Se tutkii kaikki naapurisolut ennen kuin siirtyy seuraavalle tasolle, leviten kuin vesi joka suuntaan. Koodissa ainoa ero DFS:ään on shift() popin sijaan — ensimmäinen lisätty solu käsitellään ensin. BFS löytää aina lyhimmän polun, koska se tutkii kaikki n askelen päässä olevat solut ennen n+1 askelen päässä olevia (GeeksforGeeks 2025).

##### A* (A-star)

A* on heuristinen hakualgoritmi joka yhdistää BFS:n optimaalisuuden ja heuristisen ohjauksen. Se valitsee aina solun jolla f = g + h on pienin, missä g on kuljettu matka entrystä ja h on arvioitu etäisyys exitiin. Heuristiikkana käytetään Manhattan-etäisyyttä: |row - exitRow| + |col - exitCol|. A* käy tyypillisesti vähemmän soluja kuin BFS koska heuristiikka ohjaa hakua exitin suuntaan. Toteutuksessa pienimmän f-arvon solu etsitään käymällä koko lista läpi, mikä on hitaampi kuin optimaalinen binary heap -toteutus (Tosato 2024).

#### Kompleksianalyysi

Testasin algoritmeja eri kokoisilla labyrinteillä (10×10, 20×20, 50×50, 100×100) molemmilla generaattoreilla. Jokaisesta testistä mitattiin polun pituus, käytyjen solujen määrä ja suoritusaika millisekunteina.

##### Recursive Backtracker-labyrintti

| Koko    | Algoritmi | Polku | Kaydyt solut | Aika (ms) |
| ------- | --------- | ----- | ------------ | --------- |
| 10x10   | DFS       | 67    | 79           | 0.18      |
| 10x10   | BFS       | 67    | 89           | 0.15      |
| 10x10   | A*        | 67    | 87           | 0.21      |
| 20x20   | DFS       | 113   | 133          | 0.06      |
| 20x20   | BFS       | 113   | 150          | 0.06      |
| 20x20   | A*        | 113   | 144          | 0.10      |
| 50x50   | DFS       | 1129  | 2118         | 0.82      |
| 50x50   | BFS       | 1129  | 2484         | 2.08      |
| 50x50   | A*        | 1129  | 2451         | 1.75      |
| 100x100 | DFS       | 1921  | 4516         | 0.79      |
| 100x100 | BFS       | 1921  | 4774         | 0.74      |
| 100x100 | A*        | 1921  | 4662         | 1.14      |

Recursive Backtracker luo täydellisen labyrintin jossa on vain yksi reitti, joten kaikki algoritmit löytävät saman polun. Käytyjen solujen erot ovat pieniä koska vaihtoehtoisia reittejä ei ole.

##### Prims-labyrintti

| Koko    | Algoritmi | Polku | Kaydyt solut | Aika (ms) |
| ------- | --------- | ----- | ------------ | --------- |
| 10x10   | DFS       | 21    | 93           | 0.05      |
| 10x10   | BFS       | 21    | 100          | 0.06      |
| 10x10   | A*        | 21    | 95           | 0.20      |
| 20x20   | DFS       | 45    | 171          | 0.08      |
| 20x20   | BFS       | 45    | 400          | 0.17      |
| 20x20   | A*        | 45    | 368          | 0.75      |
| 50x50   | DFS       | 111   | 1018         | 0.38      |
| 50x50   | BFS       | 111   | 2500         | 0.99      |
| 50x50   | A*        | 111   | 1901         | 3.48      |
| 100x100 | DFS       | 217   | 5790         | 0.86      |
| 100x100 | BFS       | 217   | 9998         | 2.58      |
| 100x100 | A*        | 217   | 6984         | 17.45     |

Prim's-labyrintissä erot näkyvät selvästi. BFS käy eniten soluja koska se leviää tasaisesti kaikkiin suuntiin. A* käy vähemmän soluja kuin BFS (100×100: 6984 vs 9998) koska heuristiikka ohjaa hakua exitin suuntaan. DFS käy vähiten soluja mutta tämä on sattumanvaraista ja riippuu siitä mihin suuntaan algoritmi sattuu etenemään.

A* on ajallisesti hitain (100×100: 17.45ms) vaikka se käy vähemmän soluja kuin BFS (2.58ms). Tämä johtuu siitä että jokaisen solun kohdalla etsitään pienimmän f-arvon solu käymällä koko lista läpi. Optimaalisempi toteutus käyttäisi binary heap -tietorakennetta joka nopeuttaisi pienimmän arvon hakua.

#### Yhteenveto

Projektissa toteutettiin kaksi labyrintin generointialgoritmia (Recursive Backtracker ja Prim's) sekä kolme ratkaisualgoritmia (DFS, BFS ja A*). Työn aikana opin miten eri hakualgoritmit toimivat käytännössä ja miten pienikin ero toteutuksessa — kuten pop() vs shift() — vaikuttaa merkittävästi algoritmin käyttäytymiseen. DFS ja BFS eroavat vain yhdellä rivillä koodia mutta tuottavat hyvin erilaisia tuloksia.

A* oli kolmesta monimutkaisin toteuttaa, mutta samalla opettavaisin. Heuristiikan käyttö ohjaamaan hakua oli uusi konsepti ja Manhattan-etäisyyden hyödyntäminen osoitti konkreettisesti miten älykäs arvio voi vähentää turhaa työtä.

Generaattorin valinnalla on suuri vaikutus ratkaisualgoritmien suorituskykyeroihin. Recursive Backtrackerin täydellisessä labyrintissä erot ovat pieniä, mutta Prim's-labyrintissä algoritmien väliset erot näkyvät selkeästi.

Jatkokehitysideana voisi olla labyrintin ratkaisun animointi askel askeleelta selaimessa sekä muiden generointialgoritmien kuten Kruskalin algoritmin lisääminen.

#### Lähteet 

GeeksforGeeks 2025. Backtracking Algorithms. Luettavissa: https://www.geeksforgeeks.org/dsa/backtracking-algorithms/. Luettu: [lisää päivämäärä].

GeeksforGeeks 2025. Tutorial on Path Problems in a Grid, Maze, or Matrix. Luettavissa: https://www.geeksforgeeks.org/dsa/tutorial-on-path-problems-in-a-grid-maze-or-matrix/. Luettu: [lisää päivämäärä].

Maze Pathfinding Visualization 2020. YouTube. Katsottavissa: https://www.youtube.com/watch?v=GC-nBgi9r0U. Katsottu: [lisää päivämäärä]

Microsoft 2024. TypeScript Documentation. Luettavissa: https://www.typescriptlang.org/docs/. Luettu: [lisää päivämäärä].

Mozilla 2024. Canvas API. MDN Web Docs. Luettavissa: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API. Luettu: [lisää päivämäärä].

Tosato, M. 2024. Exploring the Depths: Solving Mazes with A* Search Algorithm. Medium. Luettavissa: https://matteo-tosato7.medium.com/exploring-the-depths-solving-mazes-with-a-search-algorithm-c15253104899. Luettu: [lisää päivämäärä].

Wikipedia 2026. Maze generation algorithm. Luettavissa: https://en.wikipedia.org/wiki/Maze_generation_algorithm. Luettu: [lisää päivämäärä].
