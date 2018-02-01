Tests:
1. Write tests for calculate method, `Done: 06.12.2017`
2. Add tests for transform equation. `Done: 06.12.2017`
3. Tests for components. `Done: 07.12.2017`


Bugs:
1. Delete: space between two or more selected digits when user putting number (no digit). `Done: 06.12.2017`
2. Delete in SingleButtonsRow condition for length 27 line.

Improvements:
1. Add button: Clear which erases whole input data `Done: 07.12.2017`
2. Add button for erasing last put symbols <=. `Done: 07.12.2017`
3. Add buttons: ) and ( for more complex equations. `Done: 08.12.2017`
4. Add possibility to write on screen equation with number keys. `Done: 07.12.2017`
5. Change `,` to `.` `Done: 11.12.2017`

Additional improvements for future:
1. Add history of last calculations `Done: 11.12.2017`
2. Add memorizing the result to use it next time (M+, MR, MC). `Done: 19.12.2017`
3. Add square root, math power `Done: 22.12.2017`
4. Display Memory operation somewhere for user view.
- BUG: math pow after resulting should render squared value `Done: 20.12.2017`
- BUG: math pow takes last digit not a number (63 sqr => 69 should be 3969) `Done: 20.12.2017`
- BUG: math pow on calculation inside brackets: (1+2) => 9 `Done: 21.12.2017`
- REFACTOR: mathPowerLastInput method
5. Add display for current Memory saved.