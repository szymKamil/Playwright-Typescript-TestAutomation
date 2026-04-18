# Testy E2E

## 1. Zakup produktów przez niezalogowanego użytkownika
**Tagi:** @e2e, @ui

### Warunki wstępne:
- Użytkownik niezalogowany
- Przeglądarka: Chrome (latest)
- Rozdzielczość: 1920x1080


### Dane testowe:
- Produkty: 
    - produkt:**Bolt Cutters**, ilość: **4**, 
    - produkt: **Claw Hammer**, ilosć: **1**
    - produkt: **Nuts and bolts**, ilosć: **100**
    - produkt: **Construction Helmet**, ilosć: **1**
- Użytkownik (gość):
    - email: **generowany za pomocą biblioteki faker**
    - imię: **Kuba**
    - nazwisko: **Nowak**
- Adres: 
    - ulica: **Jarzębinowa**
    - miasto: **Warszawa**
    - województwo: **Mazowieckie**
    - kraj: **Polska**
    - kod pocztowy: **00-006**
- Sposób płatności:
    - numer karty kretytowej: **generowany za pomocą biblioteki faker**
    - data wygaśnięcia: **05/2029**
    - CVV: **344**
    - dane własciciela: **Kuba Nowak**
    
### Kroki:
1. Otwieram stronę https://practicesoftwaretesting.com/
2. Odszukuje produkt nr 1 na liście produktów
    - Korzystam w tym celu z wyszukiwarki
3. Otwieram kartę produktu.
4. Wprowadzam w karcie ilośc produktów do zakupienia.
5. Dodaję produkt do koszyka.
6. Powtarzam tę czynność dla pozostałych produktów.
7. W `navBarze` wybieram ikonę koszyka.
8. Przechodzę do strony koszyka.
9. Weryfikuję widocznośc głównych elementów na pierwszej karcie koszyka.
10. Weryfikuję czy w koszyku znajdują się produkty zgodnie z danymi tetsowymi.
11. Używam przycisku `Proceed to checkout` i przechodzę do kolejnego kroku w procesie zakupu.
12. W kroku `Sign In` wybieram zakłądkę `Continuue as Guest`
13. Uzupełniam dane tymczasowego użytkownika/gościa zgodnie z danymi testowymi scenariusza i zatwierdzam je przyciskiem `Continuue as Guest`.
14. Na ekranie potwierdzenia danych weryfikuję poprawnosć wprowadzonych danych i używam przycisku `Proceed to checkout`
15. Na stronie `Billing Address` uzupełniam dane adresowe zgodnie z danymi testowymi scenariusza. 
16. Zatwierdzam wprowadzone dane adresowe przyciskiem `Proceed to checkout`.
17. W kroku `Payment` wybieram na liscie `Credit card` jako formę płatności.
18. Uzupełniam dane o karcie kredytowej zgodnie z danymi tetsowymi scenariusza i zatwierdzam je przyciskiem `Confirm`.

### Oczekiwany rezultat:
1. Po użyciu przycisku `Confirm` pojawia się komunikat `Payment was successful`.
2. Po ponownym użyciu przycisku `Confirm` przenoszeni jesteśmy na stronę z potwierdzeniem złożenia zamówienia oraz `ID` zamówienia.


