----------------------------------------

### extension-inline_code_attributes

Example:

`qsort [] = []` {#mycode .haskell .numberLines startFrom="100"}


`bar = (x) -> ` {.coffee}


----------------------------------------

### extension-fenced_code_blocks

Example:

~~~~~~~
if (a > 3) {
  moveShip(5 * gravity, DOWN);
}
~~~~~~~

~~~~~~~~~~~~~~~~
~~~~~~~~~~
code including tildes
~~~~~~~~~~
~~~~~~~~~~~~~~~~

----------------------------------------

### extension-fenced_code_attributes

Example:


```js
var x = function(y){
  return k
}
```````````````

```tex
\documentclass{scrartcl}
\usepackage{foo}
...
```

```haskell
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
               qsort (filter (>= x) xs)
```

``` {.haskell}
qsort [] = []
```

~~~~ {#mycode .haskell .numberLines startFrom="100"}
qsort []     = []
qsort (x:xs) = qsort (filter (< x) xs) ++ [x] ++
               qsort (filter (>= x) xs)
~~~~